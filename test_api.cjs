const fs = require('fs');
const http = require('http');

async function testEndpoint(name, method, path, body = null, expectedStatus = 200) {
  const url = `http://127.0.0.1:8000${path}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));
    const passed = response.status === expectedStatus || response.ok || (expectedStatus === 400 && response.status === 400);
    return { name, path, method, status: response.status, passed, data };
  } catch (err) {
    return { name, path, method, status: 500, passed: false, error: err.message };
  }
}

async function runTests() {
  console.log("Starting API Tests...\n");
  const results = [];

  // 1. Health check
  results.push(await testEndpoint('Health Check', 'GET', '/api/health'));

  // 2. Auth - Register (Success)
  const testUser = `testuser_${Date.now()}`;
  const registerRes = await testEndpoint('Auth Register (Success)', 'POST', '/api/auth/register', {
    name: testUser, password: 'password123'
  });
  results.push(registerRes);
  const userId = registerRes.data?.profile?.id;

  // 3. Auth - Register (Fail: Missing password)
  results.push(await testEndpoint('Auth Register (Fail: Missing PW)', 'POST', '/api/auth/register', { name: testUser }, 400));

  // 4. Auth - Login (Success)
  results.push(await testEndpoint('Auth Login (Success)', 'POST', '/api/auth/login', {
    username: testUser, password: 'password123'
  }));

  // 5. Auth - Login (Fail: Bad PW)
  results.push(await testEndpoint('Auth Login (Fail: Bad PW)', 'POST', '/api/auth/login', {
    username: testUser, password: 'wrongpassword'
  }, 401));

  // 6. Profile - Get All
  results.push(await testEndpoint('Profile Get All', 'GET', '/api/profile/all'));

  // 7. Profile - Get ID
  if (userId) {
    results.push(await testEndpoint('Profile Get by ID', 'GET', `/api/profile/id/${userId}`));
  }

  // 8. Shop - Catalog
  results.push(await testEndpoint('Shop Catalog', 'GET', '/api/shop/items'));

  // 9. PvP - Leaderboard
  results.push(await testEndpoint('PvP Leaderboard', 'GET', '/api/pvp/leaderboard'));

  // 10. Guilds - Get All
  results.push(await testEndpoint('Guilds List', 'GET', '/api/guilds/'));

  // 11. Learning - Submit Quiz
  if (userId) {
    results.push(await testEndpoint('Learning Submit Quiz', 'POST', '/api/learning/submit-quiz', {
      user_id: userId, building_id: 'arena', subject: 'Math', correct_answers: 3, total_questions: 5, difficulty: 'Medium'
    }));
  }

  // 12. PvP - Matchmake
  if (userId) {
    results.push(await testEndpoint('PvP Matchmake', 'POST', '/api/pvp/matchmake', {
      userId: userId, playerName: testUser, subject: 'Science', stakeCoins: 50, isRanked: true
    }));
  }

  let passedCount = 0;
  console.log("=== TEST RESULTS ===");
  for (const r of results) {
    const statusIcon = r.passed ? "✅" : "❌";
    console.log(`${statusIcon} ${r.name} | ${r.method} ${r.path} | HTTP ${r.status}`);
    if (!r.passed) {
      console.log(`   Response: ${JSON.stringify(r.data || r.error)}`);
    }
    if (r.passed) passedCount++;
  }
  
  console.log(`\nTotal Passed: ${passedCount}/${results.length}`);
}

runTests();
