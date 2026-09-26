import { matchmakePvP } from './src/db/operations/pvp.js';

async function run() {
  try {
    const res = await matchmakePvP("duelist_128185_25285", "Mathematics", 50, true, [], "fdvdf");
    console.log(res);
  } catch(e) {
    console.error(e);
  }
}
run();
