const fetch = require('node-fetch') || global.fetch; // since node 24 has it
async function run() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'tester' + Date.now(), password: 'password123' })
    });
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
  } catch(e) {
    console.log("Error:", e);
  }
}
run();
