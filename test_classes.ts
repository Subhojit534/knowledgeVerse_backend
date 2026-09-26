import { getClassesByBoard } from './src/db/operations/class.js';
async function test() {
  console.log(await getClassesByBoard('CBSE'));
}
test();
