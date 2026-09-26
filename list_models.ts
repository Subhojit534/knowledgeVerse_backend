import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const models = await groq.models.list();
  console.log(models.data.map(m => m.id));
}
run();
