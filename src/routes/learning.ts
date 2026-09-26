import { Router, Request, Response } from 'express';
import { generateLearningContentWithGroq } from '../services/groq.js';
import { updateProgressAndStats } from '../db/operations.js';

export const learningRouter = Router();

// Fetch Learning Content & Questions for a Building/Subject using Groq AI
/**
 * @swagger
 * /api/learning/content:
 *   post:
 *     summary: Fetch Learning Content & Questions for a Building/Subject using Groq AI
 *     tags: [Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               building_id:
 *                 type: string
 *               building_name:
 *                 type: string
 *               subject:
 *                 type: string
 *               student_level:
 *                 type: integer
 *               topic:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               grade:
 *                 type: string
 *               curriculum:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response containing generated learning content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Failed to retrieve learning content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
learningRouter.post('/content', async (req: Request, res: Response) => {
  try {
    const { building_id, building_name, subject, student_level, topic, difficulty, grade, curriculum } = req.body || {};
    const bId = building_id || 'code';
    const subName = subject || 'Computer Science';

    const content = await generateLearningContentWithGroq({
      building_id: bId,
      building_name: building_name || 'Learning Tower',
      subject: subName,
      student_level: Number(student_level) || 1,
      topic: topic,
      difficulty: difficulty || 'Intermediate',
      grade: grade || 'Class 10',
      curriculum: curriculum || 'CBSE',
    });

    res.json(content);
  } catch (err) {
    console.error('❌ [Learning Route Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve learning content' });
  }
});

// Submit Quiz Answers and Award XP & Coins
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 xp_earned:
 *                   type: integer
 *                 coins_earned:
 *                   type: integer
 *                 new_xp:
 *                   type: integer
 *                 new_level:
 *                   type: integer
 *                 new_coins:
 *                   type: integer
 *                 profile:
 *                   type: object
 *       500:
 *         description: Failed to submit quiz results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
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

// TTS Endpoint for Question / Lesson Audio
/**
 * @swagger
 * /api/learning/tts:
 *   post:
 *     summary: TTS Endpoint for Question / Lesson Audio
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
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 text:
 *                   type: string
 *                 audio_url:
 *                   type: string
 *                   nullable: true
 *                 message:
 *                   type: string
 */
learningRouter.post('/tts', async (req: Request, res: Response) => {
  const { text } = req.body || {};
  res.json({
    success: true,
    text: text || '',
    audio_url: null,
    message: 'TTS synthesis ready',
  });
});
