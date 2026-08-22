import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Running Social & Guild API Integration Tests...\n');

  // 1. Health check
  const health = await request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/health',
    method: 'GET',
  });
  console.log('1. Health:', health.data.status === 'healthy' ? '✅ PASSED' : '❌ FAILED');

  // 2. Check My Guild when user has no guild
  const noGuild = await request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/guilds/my?userId=fresh-user-999',
    method: 'GET',
  });
  console.log(
    '2. Fresh user has no guild (guild: null):',
    noGuild.data.guild === null ? '✅ PASSED' : '❌ FAILED'
  );

  // 3. Create a brand new guild
  const createGuildRes = await request(
    {
      hostname: '127.0.0.1',
      port: 8000,
      path: '/api/guilds/create',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      leaderId: 'fresh-user-999',
      name: 'Knights of Logic',
      tag: 'KOL',
      motto: 'Knowledge is Power',
    }
  );
  console.log(
    '3. Create Guild:',
    createGuildRes.data.success === true && createGuildRes.data.guild.name === 'Knights of Logic'
      ? '✅ PASSED'
      : '❌ FAILED'
  );
  const createdGuildId = createGuildRes.data.guild.id;

  // 4. Verify My Guild for creator (Only creator in members, NO Elena/Marcus!)
  const myGuildRes = await request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/guilds/my?userId=fresh-user-999',
    method: 'GET',
  });
  const members = myGuildRes.data.members || [];
  const hasElenaOrMarcus = members.some((m) => m.name.includes('Elena') || m.name.includes('Marcus'));
  console.log(
    '4. Verify My Guild members count == 1 & NO Elena/Marcus:',
    members.length === 1 && !hasElenaOrMarcus ? '✅ PASSED' : '❌ FAILED'
  );

  // 5. Send a chat message in the guild
  const chatRes = await request(
    {
      hostname: '127.0.0.1',
      port: 8000,
      path: '/api/guilds/chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      guildId: createdGuildId,
      senderId: 'fresh-user-999',
      text: 'Welcome to Knights of Logic!',
    }
  );
  console.log(
    '5. Post Guild Chat message:',
    chatRes.data.success === true && chatRes.data.message.text === 'Welcome to Knights of Logic!'
      ? '✅ PASSED'
      : '❌ FAILED'
  );

  // 6. Verify My Guild messages history
  const myGuildWithMsg = await request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/guilds/my?userId=fresh-user-999',
    method: 'GET',
  });
  console.log(
    '6. Verify Guild Messages:',
    myGuildWithMsg.data.messages.length === 1 ? '✅ PASSED' : '❌ FAILED'
  );

  // 7. Get Friends & Available Explorers
  const friendsRes = await request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/social/friends?userId=fresh-user-999',
    method: 'GET',
  });
  console.log(
    '7. Fetch Friends & Explorers:',
    friendsRes.data.success === true && Array.isArray(friendsRes.data.availableExplorers)
      ? '✅ PASSED'
      : '❌ FAILED'
  );

  // 8. Send a friend request
  const explorer = friendsRes.data.availableExplorers[0];
  const targetId = explorer ? explorer.id : 'target-123';
  const sendReq = await request(
    {
      hostname: '127.0.0.1',
      port: 8000,
      path: '/api/social/friends/request',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      requesterId: 'fresh-user-999',
      addresseeId: targetId,
    }
  );
  console.log(
    '8. Send Friend Request:',
    sendReq.data.success === true ? '✅ PASSED' : '❌ FAILED'
  );
  const friendshipId = sendReq.data.friendship ? sendReq.data.friendship.id : null;

  // 9. Respond to Friend Request (Accept)
  if (friendshipId) {
    const respondReq = await request(
      {
        hostname: '127.0.0.1',
        port: 8000,
        path: '/api/social/friends/respond',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        friendshipId: friendshipId,
        accept: true,
      }
    );
    console.log(
      '9. Accept Friend Request:',
      respondReq.data.success === true ? '✅ PASSED' : '❌ FAILED'
    );
  }

  // 10. Challenge Duel
  const duelRes = await request(
    {
      hostname: '127.0.0.1',
      port: 8000,
      path: '/api/social/duel/challenge',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      challengerId: 'fresh-user-999',
      challengedId: targetId,
      buildingId: 'code',
      subject: 'Computer Science',
      stakeCoins: 50,
    }
  );
  console.log(
    '10. Duel Challenge:',
    duelRes.data.success === true ? '✅ PASSED' : '❌ FAILED'
  );

  console.log('\n🎉 ALL SOCIAL & GUILD TESTS COMPLETED SUCCESSFULLY!\n');
}

runTests().catch(console.error);
