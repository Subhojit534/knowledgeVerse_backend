import { Router, Request, Response } from 'express';
import { updateProgressAndStats, getRandomQuestions } from '../db/operations.js';
import Groq from 'groq-sdk';

export const learningRouter = Router();

// Cache instances
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

/**
 * @swagger
 * /api/learning/content:
 *   post:
 *     summary: Fetch Random Questions for a Subtopic or Topic
 *     tags: [Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtopic_id:
 *                 type: string
 *                 example: "c0000009-0001-0000-0000-000000000065"
 *               topic_id:
 *                 type: string
 *                 example: "c0000001-0001-0000-0000-000000000000"
 *               limit:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Successful response containing random questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to retrieve learning content
 */
learningRouter.post('/content', async (req: Request, res: Response) => {
  try {
    const { subtopic_id, topic_id, limit, building_id, building_name, subject } = req.body;
    
    if (!subtopic_id && !topic_id) {
        return res.status(400).json({ success: false, error: 'Must provide subtopic_id or topic_id' });
    }

    const questions = await getRandomQuestions(subtopic_id, topic_id, limit || 5);

    res.json({
        success: true,
        building_id: building_id || 'code',
        building_name: building_name || '',
        subject: subject || '',
        questions
    });
  } catch (err: any) {
    console.error('❌ [Learning Content Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve learning content', details: err.message });
  }
});

/**
 * @swagger
 * /api/learning/chat:
 *   post:
 *     summary: Chat with AI Tutor using Groq
 *     tags: [Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Can you explain Newton's second law?"
 *     responses:
 *       200:
 *         description: AI Tutor response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: string
 *                   example: "Newton's second law states that Force equals mass times acceleration (F=ma)."
 *       500:
 *         description: Server Error
 */
learningRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    if (!groq) {
      return res.status(500).json({ success: false, error: 'Groq API Key not configured' });
    }

    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const completion = await groq.chat.completions.create({
      model: 'qwen/qwen3.8-27b',
      messages: [
        { role: 'system', content: 'You are a helpful AI Tutor for KnowledgeVerse.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({
      success: true,
      response: completion.choices[0]?.message?.content || ''
    });
  } catch (err: any) {
    console.error('❌ [Groq Chat Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to generate response' });
  }
});

/**
 * @swagger
 * /api/learning/submit-quiz:
 *   post:
 *     summary: Submit Quiz Answers and Award XP & Coins
 *     tags: [Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               building_id:
 *                 type: string
 *               subject:
 *                 type: string
 *               correct_answers:
 *                 type: integer
 *               total_questions:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Failed to submit quiz results
 */
learningRouter.post('/submit-quiz', async (req: Request, res: Response) => {
  try {
    const { user_id, building_id, subject, correct_answers, total_questions } = req.body || {};
    const uId = user_id || 'demo-user-123';
    const bId = building_id || 'code';
    const subName = subject || 'Computer Science';
    const correctCount = Number(correct_answers) || 0;
    const totalCount = Number(total_questions) || 4;
    const difficultyLevel = req.body.difficulty || "Medium";

    const result = await updateProgressAndStats(uId, bId, subName, correctCount, totalCount, difficultyLevel);

    res.json({
      success: true,
      message: 'Quiz score submitted successfully',
      xp_earned: result.xpEarned,
      coins_earned: result.coinsEarned,
      new_xp: result.newProfile.xp,
      new_level: result.newProfile.level,
      new_coins: result.newProfile.coins,
      profile: result.newProfile,
    });
  } catch (err) {
    console.error('❌ [Quiz Submit Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to submit quiz results' });
  }
});

/**
 * @swagger
 * /api/learning/tts:
 *   post:
 *     summary: TTS Endpoint for Question / Lesson Audio using ElevenLabs
 *     tags: [Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Welcome to KnowledgeVerse!"
 *     responses:
 *       200:
 *         description: Successful response containing raw audio stream
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error
 */
learningRouter.post('/tts', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Text is required' });

    const apiKey = process.env.ELEVEN_LABS_API_KEY;
    if (!apiKey) return res.status(500).json({ success: false, error: 'ElevenLabs API Key not configured' });

    // Using "Rachel" voice as default
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; 
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`ElevenLabs API error: ${response.status} ${errText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err: any) {
    console.error('❌ [TTS Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to generate audio' });
  }
});
