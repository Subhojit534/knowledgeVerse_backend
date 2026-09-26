import { getRandomQuestions } from './src/db/operations/learning.js';
async function run() {
  try {
    const q1 = await getRandomQuestions(undefined, "b0000005-0001-0000-0000-000000000001", 2);
    console.log("Q:", JSON.stringify(q1, null, 2));
  } catch(e) { console.error(e); }
}
run();
