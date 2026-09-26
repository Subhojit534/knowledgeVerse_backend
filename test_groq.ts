import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log("Testing Groq AI Tutor...");
  try {
    const completion = await groq.chat.completions.create({
      model: 'qwen/qwen3.8-27b',
      messages: [
        { role: 'system', content: 'You are a helpful AI Tutor for KnowledgeVerse.' },
        { role: 'user', content: 'Can you explain Newtons second law in one short sentence?' }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });
    console.log("Response:", completion.choices[0]?.message?.content);
  } catch(e) {
    console.error("Groq Error:", e);
  }
}
run();
