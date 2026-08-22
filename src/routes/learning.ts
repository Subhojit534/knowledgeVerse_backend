import { Router, Request, Response } from 'express';
import { getQuestionsForBuilding } from '../data/questionsData.js';
import { updateProgressAndStats } from '../db/supabase.js';

export const learningRouter = Router();

// Fetch Learning Content & Questions for a Building/Subject
learningRouter.post('/content', async (req: Request, res: Response) => {
  try {
    const { building_id, building_name, subject } = req.body || {};
    const bId = building_id || 'code';
    const subName = subject || 'Computer Science';

    const content = getQuestionsForBuilding(bId, subName);

    res.json({
      ...content,
      building_id: bId,
      building_name: building_name || content.building_name,
      subject: subName,
    });
  } catch (err) {
    console.error('❌ [Learning Route Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve learning content' });
  }
});

// Submit Quiz Answers and Award XP & Coins
learningRouter.post('/submit-quiz', async (req: Request, res: Response) => {
  try {
    const { user_id, building_id, subject, correct_answers, total_questions } = req.body || {};
    const uId = user_id || 'demo-user-123';
    const bId = building_id || 'code';
    const subName = subject || 'Computer Science';
    const correctCount = Number(correct_answers) || 0;
    const totalCount = Number(total_questions) || 4;

    const result = await updateProgressAndStats(uId, bId, subName, correctCount, totalCount);

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
learningRouter.post('/tts', async (req: Request, res: Response) => {
  const { text } = req.body || {};
  res.json({
    success: true,
    text: text || '',
    audio_url: null,
    message: 'TTS synthesis ready',
  });
});
