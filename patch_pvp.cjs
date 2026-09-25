const fs = require('fs');

let pvp = fs.readFileSync('src/routes/pvp.ts', 'utf8');

pvp = pvp.replace(
  "import { getQuestionsForBuilding } from '../data/questionsData.js';",
  "import { drizzleClient as db } from '../db/drizzle_client.js';\nimport { question } from '../data/model/question.js';\nimport { option } from '../data/model/option.js';\nimport { sql, eq } from 'drizzle-orm';"
);

pvp = pvp.replace(
  /function getPvPQuestions\(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'\): MCQuestion\[\] \{[\s\S]*?return \[\];\n\}/,
  `async function getPvPQuestions(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'): Promise<MCQuestion[]> {
  try {
    const randomQuestions = await db.select().from(question).orderBy(sql\`RANDOM()\`).limit(5);
    const formattedQuestions = [];
    for (const q of randomQuestions) {
      const opts = await db.select().from(option).where(eq(option.question_id, q.id));
      const correctAnswer = opts.find((o: any) => o.is_correct)?.option || '';
      formattedQuestions.push({
        id: q.id,
        question: q.question,
        options: opts.map((o: any) => o.option),
        correct_answer: correctAnswer,
        explanation: 'Keep learning!',
      });
    }
    return formattedQuestions as any;
  } catch (err) {
    console.error('PvP Question Fetch Error', err);
  }
  return [];
}`
);

fs.writeFileSync('src/routes/pvp.ts', pvp, 'utf8');
