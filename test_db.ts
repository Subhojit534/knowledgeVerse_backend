import { saveProfile } from './src/db/operations/user.js';

async function test() {
  try {
    const res = await saveProfile({
      name: "testdude",
      password: "password123",
      class_id: "00000005-0001-0000-0000-000000000000",
      avatar_id: 1,
      xp: 150,
      level: 1,
      coins: 500,
      gems: 25,
      energy: 100,
      streak_days: 1,
    });
    console.log("Success:", res);
  } catch(e) {
    console.error("DB Error:", e);
  }
}
test();
