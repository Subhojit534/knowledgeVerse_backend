const fs = require('fs');

let pvp = fs.readFileSync('src/routes/pvp.ts', 'utf8');

pvp = pvp.replace(
  "import { getQuestionsForBuilding } from '../data/questionsData.js';",
  "import { drizzleClient as db } from '../db/drizzle_client.js';\nimport { question } from '../data/model/question.js';\nimport { sql } from 'drizzle-orm';"
);

pvp = pvp.replace(
  "function getPvPQuestions(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'): MCQuestion[] {",
  "async function getPvPQuestions(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'): Promise<any[]> {"
);

const oldFuncBody = `
  try {
    const fallback = getQuestionsForBuilding('arena', subject);
    if (fallback && Array.isArray(fallback.questions) && fallback.questions.length > 0) {
      return [...fallback.questions].sort(() => 0.5 - Math.random()).slice(0, 5);
    }
  } catch (err) {
    console.error('PvP Question Fetch Error', err);
  }
  return [];
`;

const newFuncBody = `
  try {
    const rows = await db.select().from(question).orderBy(sql\`RANDOM()\`).limit(5);
    return rows.map((r: any) => ({
      id: r.id,
      question: r.question,
      options: ['Option A', 'Option B', 'Option C', 'Option D'], // TODO: Fetch from option table
      correct_answer: 'Option A', // TODO: Identify correct option
      explanation: 'Explanation',
    }));
  } catch (err) {
    console.error('PvP Question Fetch Error', err);
  }
  return [];
`;

// It's too complex to string replace the function body reliably, let's just rewrite the function
