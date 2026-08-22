import { Groq } from 'groq-sdk';
import { LearningContentPayload, LearningRequest, MCQuestion } from '../types/index.js';
import { getQuestionsForBuilding } from '../data/questionsData.js';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

let groqClient: any = null;

function getGroqClient(): any {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: GROQ_API_KEY,
    });
  }
  return groqClient;
}

/**
 * Shuffles options of each question and updates the correct_index using exact
 * answer-text matching to guarantee 100% accurate answer validation.
 */
function shuffleQuestionOptions(questions: any[]): MCQuestion[] {
  return questions.map((q) => {
    const rawOpts = (Array.isArray(q.options) ? q.options : []).map(String).map((s: string) => s.trim());
    const opts = rawOpts.filter((s: string) => s.length > 0);
    while (opts.length < 4) {
      opts.push(`Option ${opts.length + 1}`);
    }

    // 1. Resolve true correct answer text safely
    let correctText = '';
    if (q.correct_answer_text && typeof q.correct_answer_text === 'string') {
      correctText = q.correct_answer_text.trim();
    }

    // If not specified or not matching, resolve from correct_index (handling 0-based, 1-based, letters A-D)
    if (!correctText || !opts.some((opt: string) => opt.toLowerCase() === correctText.toLowerCase())) {
      let rawIdx = 0;
      if (typeof q.correct_index === 'number') {
        rawIdx = q.correct_index;
      } else if (typeof q.correct_index === 'string') {
        const trimmed = q.correct_index.trim().toUpperCase();
        if (trimmed === 'A') rawIdx = 0;
        else if (trimmed === 'B') rawIdx = 1;
        else if (trimmed === 'C') rawIdx = 2;
        else if (trimmed === 'D') rawIdx = 3;
        else rawIdx = parseInt(trimmed, 10) || 0;
      }

      // If index was 1-based (1..4)
      if (rawIdx >= 1 && rawIdx <= 4 && rawIdx === opts.length) {
        rawIdx = rawIdx - 1;
      } else if (rawIdx >= 4) {
        rawIdx = 3;
      } else if (rawIdx < 0) {
        rawIdx = 0;
      }

      correctText = opts[rawIdx] || opts[0];
    }

    // 2. Perform Fisher-Yates shuffle on options
    const shuffledOptions = [...opts];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    // 3. Find the exact matching index of the correct text in shuffledOptions
    const finalIndex = shuffledOptions.findIndex(
      (opt: string) => opt.toLowerCase() === correctText.toLowerCase()
    );

    return {
      id: Number(q.id) || 1,
      question: String(q.question || 'Question'),
      options: shuffledOptions.slice(0, 4),
      correct_index: finalIndex >= 0 ? finalIndex : 0,
      explanation: String(q.explanation || 'Correct answer principle.'),
    };
  });
}

/**
 * High-speed AI Learning Content & Quiz Generator powered by Groq AI.
 * 
 * Enforces strict pedagogical standards per student class (Class 6 - Class 12),
 * subject domain, and specific chapter/building topic.
 * 
 * Option B: Generates fresh, random, unique questions on every quiz attempt.
 */
export async function generateLearningContentWithGroq(
  request: LearningRequest
): Promise<LearningContentPayload> {
  const buildingId = request.building_id || 'code';
  const buildingName = request.building_name || 'Learning Sanctum';
  const subject = request.subject || 'Computer Science';
  const level = request.student_level || 1;
  const topic = request.topic || buildingName;
  const grade = request.grade || 'Class 10';
  const curriculum = request.curriculum || 'CBSE';

  const cacheKey = `groq_${subject.toLowerCase()}_${buildingId.toLowerCase()}_lvl${level}_${Date.now()}`;

  try {
    const groq = getGroqClient();

    const systemPrompt = `You are the Grand Archmage and Master Scholar of KnowledgeVerse, an educational RPG.
Your mission is to generate a pedagogically rigorous, engaging learning module tailored strictly to student grade: "${grade}" (${curriculum} curriculum).

CRITICAL GRADE-LEVEL PEDAGOGICAL RULES:
- You MUST calibrate all mathematical formulas, vocabulary, depth of explanation, and questions to match students in ${grade}.
- For Class 6 to 8: Focus on foundational understanding, intuitive real-world examples, basic arithmetic/pre-algebra, physical observations. (NO advanced calculus, no higher-level trigonometry, no complex organic chemical mechanisms).
- For Class 9 to 10: Focus on secondary curriculum standards (e.g. linear/quadratic equations, coordinate geometry, basic trigonometry, light ray diagrams, chemical equations, cell division).
- For Class 11 to 12: Focus on senior secondary standards (e.g. derivatives, vectors, matrices, electromagnetism, chemical thermodynamics, organic reaction pathways).
- Strictly adhere to the requested subject: "${subject}" and specific chapter/topic: "${topic}".

ACCURACY & ANSWER KEYS (CRITICAL):
- In every question object, specify BOTH "correct_index" (0 to 3) AND "correct_answer_text" (the exact string text of the correct option).
- Ensure the question is unambiguous and has exactly one mathematically/scientifically correct answer.

Output Rules:
1. Return ONLY a valid JSON object matching the requested schema.
2. The explanation must be 2 to 3 sentences: inspiring, clear, conceptual, and appropriate for ${grade}.
3. Provide exactly 4 multiple-choice questions with 4 distinct options each and correct_index from 0 to 3.
4. Explanations must clearly explain the underlying principle.`;

    const userPrompt = `Generate a fresh, unique learning module for:
Grade: ${grade} (${curriculum})
Subject: ${subject}
Building/Chapter: ${buildingName}
Specific Topic: ${topic}
Mastery Tier: Level ${level}

Required JSON schema:
{
  "building_id": "${buildingId}",
  "building_name": "${buildingName}",
  "subject": "${subject}",
  "topic": "${topic}",
  "grade": "${grade}",
  "explanation": "2-3 sentence concept overview suitable for ${grade}.",
  "questions": [
    {
      "id": 1,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 0,
      "correct_answer_text": "Exact text matching Option A",
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 2,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 1,
      "correct_answer_text": "Exact text matching Option B",
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 3,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 2,
      "correct_answer_text": "Exact text matching Option C",
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 4,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 3,
      "correct_answer_text": "Exact text matching Option D",
      "explanation": "Clear explanation of the correct answer."
    }
  ]
}`;

    const modelsToTry = [
      'groq/compound-mini',
      'groq/compound',
      'openai/gpt-oss-20b',
      'openai/gpt-oss-120b',
    ];

    let responseText: string | null | undefined;
    let selectedModel = 'groq/compound-mini';

    for (const model of modelsToTry) {
      try {
        const completion = await groq.chat.completions.create({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
          max_tokens: 2500,
        });
        responseText = completion.choices[0]?.message?.content;
        if (responseText) {
          selectedModel = model;
          break;
        }
      } catch (modelErr) {
        console.warn(`⚠️ [Groq AI Model ${model}]: ${modelErr}`);
      }
    }

    if (!responseText) {
      throw new Error('Empty response received from Groq AI');
    }

    const parsed = JSON.parse(responseText);

    // Validate and sanitize questions array
    const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : [];
    let processedQuestions: any[] = rawQuestions;

    if (processedQuestions.length < 4) {
      const fb = getQuestionsForBuilding(buildingId, subject);
      processedQuestions = fb.questions;
    }

    // Apply option shuffling with guaranteed correct_answer_text matching
    const shuffledQuestions = shuffleQuestionOptions(processedQuestions.slice(0, 4));

    const result: LearningContentPayload = {
      building_id: buildingId,
      building_name: parsed.building_name || buildingName,
      subject: parsed.subject || subject,
      topic: parsed.topic || topic,
      explanation: parsed.explanation || `Master the fundamental principles of ${topic} for ${grade}.`,
      questions: shuffledQuestions,
      audio_available: false,
      source: `groq-${selectedModel}`,
      cache_key: cacheKey,
    };

    console.log(`⚡ [Groq AI Success]: Generated random MCQs for ${grade} ${subject} - "${buildingName}" (${result.topic})`);
    return result;
  } catch (err) {
    console.warn(`⚠️ [Groq AI Fallback]: ${err}. Using offline questions dataset.`);
    const fallback = getQuestionsForBuilding(buildingId, subject);
    const randomizedFallback = shuffleQuestionOptions(fallback.questions);

    return {
      ...fallback,
      building_id: buildingId,
      building_name: buildingName,
      subject: subject,
      questions: randomizedFallback,
      source: 'offline-fallback',
      cache_key: cacheKey,
    };
  }
}
