import Groq from 'groq-sdk';
import { LearningContentPayload, LearningRequest, MCQuestion } from '../types/index.js';
import { getQuestionsForBuilding } from '../data/questionsData.js';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: GROQ_API_KEY,
    });
  }
  return groqClient;
}

/**
 * Shuffles options of each question and updates the correct_index accordingly
 * to ensure no two attempts or students see the exact same layout.
 */
function shuffleQuestionOptions(questions: MCQuestion[]): MCQuestion[] {
  return questions.map((q) => {
    const originalCorrectOption = q.options[q.correct_index];
    const shuffledOptions = [...q.options];

    // Fisher-Yates shuffle
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

    return {
      ...q,
      options: shuffledOptions,
      correct_index: newCorrectIndex >= 0 ? newCorrectIndex : 0,
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
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 2,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 1,
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 3,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 2,
      "explanation": "Clear explanation of the correct answer."
    },
    {
      "id": 4,
      "question": "Question text appropriate for ${grade}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 3,
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
          temperature: 0.7, // Higher temperature for fresh, random variety on each attempt
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
    let questions: MCQuestion[] = rawQuestions.map((q: any, idx: number) => {
      const opts = Array.isArray(q.options) ? q.options.map(String) : [];
      while (opts.length < 4) {
        opts.push(`Option ${opts.length + 1}`);
      }
      return {
        id: idx + 1,
        question: String(q.question || `Question ${idx + 1}`),
        options: opts.slice(0, 4),
        correct_index: Math.max(0, Math.min(3, Number(q.correct_index) || 0)),
        explanation: String(q.explanation || 'Correct concept applied.'),
      };
    });

    if (questions.length < 4) {
      const fb = getQuestionsForBuilding(buildingId, subject);
      questions = fb.questions;
    }

    // Apply option shuffling so options (A,B,C,D) are randomized
    const shuffledQuestions = shuffleQuestionOptions(questions.slice(0, 4));

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
