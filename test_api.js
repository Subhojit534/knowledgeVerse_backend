process.env.NODE_ENV = 'test';
import http from 'http';
import { app } from './dist/server.js';

const PORT = 8001; // test port

const server = app.listen(PORT, '127.0.0.1', async () => {
  console.log(`🧪 Test server started on http://127.0.0.1:${PORT}`);
  let passed = 0;
  let failed = 0;

  async function request(path, options = {}) {
    const url = `http://127.0.0.1:${PORT}${path}`;
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : null;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    return new Promise((resolve, reject) => {
      const req = http.request(url, { method, headers }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, data: json });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });
      req.on('error', reject);
      if (body) req.write(body);
      req.end();
    });
  }

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ [PASS]: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL]: ${name} ->`, err.message);
      failed++;
    }
  }

  console.log('\n--- 🚀 RUNNING API INTEGRATION TESTS ---');

  await test('1. Health Check (GET /api/health)', async () => {
    const res = await request('/api/health');
    if (res.status !== 200 || res.data.status !== 'healthy') throw new Error(`Unexpected status ${res.status}`);
  });

  await test('2. Explorer Registration (POST /api/auth/register)', async () => {
    const uniqueName = `TestExplorer_${Date.now()}`;
    const res = await request('/api/auth/register', {
      method: 'POST',
      body: {
        name: uniqueName,
        password: 'securePassword123',
        grade: 'Class 10',
        curriculum: 'CBSE',
        subjects: ['Mathematics', 'Computer Science'],
      },
    });
    if (res.status !== 200 || !res.data.success || !res.data.profile) throw new Error(JSON.stringify(res.data));
  });

  await test('3. Explorer Login (POST /api/auth/login)', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      body: {
        name: 'Elena Vance',
        password: 'password123',
      },
    });
    if (res.status !== 200 || !res.data.success || !res.data.profile) throw new Error(JSON.stringify(res.data));
  });

  await test('4. Onboarding Intro (POST /api/intro)', async () => {
    const res = await request('/api/intro', {
      method: 'POST',
      body: {
        name: `IntroUser_${Date.now()}`,
        password: 'password123',
        grade: 'Class 11',
        curriculum: 'ICSE',
        subjects: ['Physics', 'Mathematics'],
      },
    });
    if (res.status !== 200 || !res.data.success || !res.data.narration) throw new Error(JSON.stringify(res.data));
  });

  await test('5. Fetch Current Profile (GET /api/profile/me)', async () => {
    const res = await request('/api/profile/me');
    if (res.status !== 200 || !res.data.success || !res.data.profile) throw new Error(JSON.stringify(res.data));
  });

  await test('6. Update Profile (PUT /api/profile/me)', async () => {
    const res = await request('/api/profile/me', {
      method: 'PUT',
      body: {
        learning_goal: 'Master of Quantum Mechanics',
      },
    });
    if (res.status !== 200 || !res.data.success || res.data.profile.learning_goal !== 'Master of Quantum Mechanics') {
      throw new Error(JSON.stringify(res.data));
    }
  });

  await test('7. Fetch All Profiles (GET /api/profile/all)', async () => {
    const res = await request('/api/profile/all');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.profiles)) throw new Error(JSON.stringify(res.data));
  });

  await test('8. Fetch Learning Content & 4 MCQs (POST /api/learning/content)', async () => {
    const res = await request('/api/learning/content', {
      method: 'POST',
      body: {
        building_id: 'code',
        building_name: 'Tower of Algorithms',
        subject: 'Computer Science',
      },
    });
    if (res.status !== 200 || !res.data.questions || res.data.questions.length !== 4) throw new Error(JSON.stringify(res.data));
  });

  await test('9. Submit Quiz & Progression Reward (POST /api/learning/submit-quiz)', async () => {
    const res = await request('/api/learning/submit-quiz', {
      method: 'POST',
      body: {
        building_id: 'code',
        subject: 'Computer Science',
        correct_answers: 4,
        total_questions: 4,
      },
    });
    if (res.status !== 200 || !res.data.success || res.data.xp_earned <= 0) throw new Error(JSON.stringify(res.data));
  });

  await test('10. Global Leaderboard (GET /api/leaderboard)', async () => {
    const res = await request('/api/leaderboard');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.leaderboard)) throw new Error(JSON.stringify(res.data));
  });

  await test('11. Category Leaderboard (GET /api/leaderboard/category/MATH)', async () => {
    const res = await request('/api/leaderboard/category/MATH');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.leaderboard)) throw new Error(JSON.stringify(res.data));
  });

  await test('12. Player Inventory (GET /api/inventory)', async () => {
    const res = await request('/api/inventory');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.inventory)) throw new Error(JSON.stringify(res.data));
  });

  await test('13. Equip Inventory Item (POST /api/inventory/equip)', async () => {
    const res = await request('/api/inventory/equip', {
      method: 'POST',
      body: {
        itemId: 'wand',
      },
    });
    if (res.status !== 200 || !res.data.success) throw new Error(JSON.stringify(res.data));
  });

  await test('14. Consume Item (POST /api/inventory/use)', async () => {
    const res = await request('/api/inventory/use', {
      method: 'POST',
      body: {
        itemId: 'potion',
      },
    });
    if (res.status !== 200 || !res.data.success) throw new Error(JSON.stringify(res.data));
  });

  await test('15. Shop Catalog (GET /api/shop/items)', async () => {
    const res = await request('/api/shop/items?category=FEATURED');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.items) || res.data.items.length === 0) {
      throw new Error(JSON.stringify(res.data));
    }
  });

  await test('16. Shop Purchase (POST /api/shop/purchase)', async () => {
    const res = await request('/api/shop/purchase', {
      method: 'POST',
      body: {
        shopItemId: 'b_potion',
      },
    });
    if (res.status !== 200 || !res.data.success) throw new Error(JSON.stringify(res.data));
  });

  await test('17. Social Friends (GET /api/social/friends)', async () => {
    const res = await request('/api/social/friends');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.friends)) throw new Error(JSON.stringify(res.data));
  });

  await test('18. Guilds List (GET /api/guilds)', async () => {
    const res = await request('/api/guilds');
    if (res.status !== 200 || !res.data.success || !Array.isArray(res.data.guilds)) throw new Error(JSON.stringify(res.data));
  });

  await test('19. My Guild Details & Chat (GET /api/guilds/my)', async () => {
    const res = await request('/api/guilds/my');
    if (res.status !== 200 || !res.data.success || !res.data.guild) throw new Error(JSON.stringify(res.data));
  });

  await test('20. Post Guild Chat (POST /api/guilds/chat)', async () => {
    const myGuildRes = await request('/api/guilds/my');
    const guildId = myGuildRes.data.guild.id;
    const res = await request('/api/guilds/chat', {
      method: 'POST',
      body: {
        guildId: guildId,
        text: 'Hello fellow wizards and scholars!',
      },
    });
    if (res.status !== 200 || !res.data.success || !res.data.message) throw new Error(JSON.stringify(res.data));
  });

  console.log(`\n=======================================================`);
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`=======================================================\n`);

  server.close(() => {
    process.exit(failed > 0 ? 1 : 0);
  });
});
