import { Router, Request, Response } from 'express';
import {
  matchmakePvP,
  cancelMatchmaking,
  getPvPSession,
  submitPvPRound,
  finishPvPSession,
  getUserPvPStats,
  getPvPLeaderboard,
  getPendingPvPChallenges,
  respondToPvPChallenge,
  consumePvPChallenge,
  createDuelChallenge,
  createPvPRoom,
  joinPvPRoom,
  getPvPRoomStatus,
  cancelPvPRoom,
} from '../db/supabase.js';


import { generateLearningContentWithGroq } from '../services/groq.js';
import { getQuestionsForBuilding } from '../data/questionsData.js';
import { MCQuestion } from '../types/index.js';

export const pvpRouter = Router();

/**
 * Helper to fetch 5 quiz questions for a PvP subject match instantly (no blocking network calls).
 */
function getPvPQuestions(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'): MCQuestion[] {
  try {
    const fallback = getQuestionsForBuilding('arena', subject);
    if (fallback && Array.isArray(fallback.questions) && fallback.questions.length > 0) {
      // Return shuffled 5-question pool for high variability
      return [...fallback.questions].sort(() => Math.random() - 0.5).slice(0, 5);
    }
  } catch (err) {
    console.warn('⚠️ [PvP Questions Fallback Error]:', err);
  }

  // Guaranteed fallback default question
  return [
    {
      id: 1,
      question: 'Which principle states that energy cannot be created or destroyed, only transformed?',
      options: ['Law of Conservation of Energy', 'Newton\'s First Law', 'Hooke\'s Law', 'Pascal\'s Principle'],
      correct_index: 0,
      explanation: 'The Law of Conservation of Energy states total energy remains constant.',
    },
  ];


}


// 1. MATCHMAKING QUEUE / INSTANT AI MATCH (Practice) / REAL DUEL POOL
pvpRouter.post('/matchmake', async (req: Request, res: Response) => {
  try {
    const { userId, playerName, subject, stakeCoins, isRanked, grade, curriculum } = req.body || {};
    const uId = userId || 'demo-user-123';
    const sub = subject || 'Mathematics';
    const stake = Number(stakeCoins) >= 0 ? Number(stakeCoins) : 50;
    const ranked = isRanked !== false;

    console.log(`⚔️ [PvP Matchmake Request]: Player "${playerName || uId}" (${uId}) seeking ${sub} match (Ranked/Real: ${ranked}, Stake: ${stake} coins)`);

    const questions = await getPvPQuestions(sub, grade, curriculum);
    const result = await matchmakePvP(uId, sub, stake, ranked, questions, playerName);

    res.json({
      success: true,
      matchedWithAI: result.matchedWithAI,
      session: result.session,
      waiting: result.waiting || false,
    });

  } catch (err: any) {
    console.error('❌ [PvP Matchmake Error]:', err);
    res.status(400).json({
      success: false,
      error: err.message || 'Failed to matchmake PvP duel',
    });
  }
});

// CANCEL MATCHMAKING QUEUE
pvpRouter.post('/matchmake/cancel', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body || {};
    cancelMatchmaking(String(userId || 'demo-user-123'));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET SESSION STATE
pvpRouter.get('/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const sessionId = String(req.params.sessionId);
    const session = getPvPSession(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, error: 'PvP Session not found' });
    }

    res.json({ success: true, session });
  } catch (err: any) {
    console.error('❌ [PvP Get Session Error]:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 3. SUBMIT ROUND ANSWER & COMPUTE DAMAGE
pvpRouter.post('/session/:sessionId/round', async (req: Request, res: Response) => {
  try {
    const sessionId = String(req.params.sessionId);
    const { user_id, round_index, selected_index, time_taken_ms } = req.body || {};

    if (!user_id || round_index === undefined || selected_index === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required round submission fields' });
    }

    const result = await submitPvPRound({
      user_id: String(user_id),
      session_id: sessionId,
      round_index: Number(round_index),
      selected_index: Number(selected_index),
      time_taken_ms: Number(time_taken_ms) || 3000,
    });

    res.json({
      success: true,
      session: result.session,
      roundResult: result.roundResult,
    });
  } catch (err: any) {
    console.error('❌ [PvP Submit Round Error]:', err);
    res.status(400).json({ success: false, error: err.message || 'Failed to process round answer' });
  }
});

// 4. FINISH PVP SESSION & DISTRIBUTE REWARDS
pvpRouter.post('/session/:sessionId/finish', async (req: Request, res: Response) => {
  try {
    const sessionId = String(req.params.sessionId);
    const result = await finishPvPSession(sessionId);

    console.log(`🏆 [PvP Match Completed]: Winner: ${result.winnerId || 'DRAW'} (Session: ${sessionId})`);

    res.json({
      success: true,
      session: result.session,
      winnerId: result.winnerId,
      isDraw: result.isDraw,
      rewards: result.rewards,
    });
  } catch (err: any) {
    console.error('❌ [PvP Finish Session Error]:', err);
    res.status(400).json({ success: false, error: err.message || 'Failed to finish PvP duel session' });
  }
});

// 5. GET USER PVP STATS & TIER
pvpRouter.get('/stats/:userId', async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId || 'demo-user-123');
    const stats = await getUserPvPStats(userId);

    res.json({ success: true, stats });
  } catch (err: any) {
    console.error('❌ [PvP Get Stats Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch user PvP stats' });
  }
});


// 6. GET PVP LEADERBOARD
pvpRouter.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await getPvPLeaderboard();
    res.json({ success: true, leaderboard });
  } catch (err: any) {
    console.error('❌ [PvP Leaderboard Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch PvP leaderboard' });
  }
});

// 7. GET PENDING CHALLENGES
pvpRouter.get('/challenges', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';
    const challenges = await getPendingPvPChallenges(userId);

    res.json({
      success: true,
      received: challenges.received,
      sent: challenges.sent,
    });
  } catch (err: any) {
    console.error('❌ [PvP Challenges Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch duel challenges' });
  }
});

// 8. SEND CHALLENGE TO FRIEND
pvpRouter.post('/challenge', async (req: Request, res: Response) => {
  try {
    const { challengerId, challengedId, subject, stakeCoins, challengerName, challengedName } = req.body || {};
    if (!challengedId) {
      return res.status(400).json({ success: false, error: 'challengedId is required' });
    }

    const duel = await createDuelChallenge(
      challengerId || 'demo-user-123',
      challengedId,
      'arena',
      subject || 'Mathematics',
      Number(stakeCoins) || 50,
      challengerName,
      challengedName
    );

    res.json({
      success: true,
      message: 'Duel challenge sent successfully',
      duel,
    });
  } catch (err: any) {
    console.error('❌ [PvP Send Challenge Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to send duel challenge' });
  }
});

// 9. RESPOND TO CHALLENGE (ACCEPT / DECLINE)
pvpRouter.post('/challenges/respond', async (req: Request, res: Response) => {
  try {
    const { challengeId, accept, grade, curriculum, subject } = req.body || {};
    if (!challengeId) {
      return res.status(400).json({ success: false, error: 'challengeId is required' });
    }

    let questions: MCQuestion[] = [];
    if (accept) {
      questions = await getPvPQuestions(subject || 'Mathematics', grade, curriculum);
    }

    const result = await respondToPvPChallenge(challengeId, accept !== false, questions);

    res.json({
      success: result.success,
      session: result.session,
      message: accept !== false ? 'Challenge accepted! Duel session created.' : 'Challenge declined.',
    });
  } catch (err: any) {
    console.error('❌ [PvP Respond Challenge Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to respond to duel challenge' });
  }
});

// 9b. CONSUME CHALLENGE (Mark as joined to prevent repeated auto-start loops)
pvpRouter.post('/challenges/consume', async (req: Request, res: Response) => {
  try {
    const { challengeId, sessionId } = req.body || {};
    if (challengeId) {
      await consumePvPChallenge(challengeId, sessionId);
    }
    res.json({ success: true });
  } catch (_) {
    res.json({ success: true });
  }
});


// 10. CREATE PRIVATE ROOM CODE
pvpRouter.post('/room/create', async (req: Request, res: Response) => {
  try {
    const { userId, playerName, subject, stakeCoins, grade, curriculum } = req.body || {};
    const questions = await getPvPQuestions(subject || 'Mathematics', grade, curriculum);

    const result = await createPvPRoom({
      userId: String(userId || 'player-1'),
      playerName: playerName ? String(playerName) : undefined,
      subject: String(subject || 'Mathematics'),
      stakeCoins: Number(stakeCoins) || 50,
      grade,
      curriculum,
      questions,
    });

    res.json({
      success: true,
      roomCode: result.roomCode,
      room: result.room,
    });
  } catch (err: any) {
    console.error('❌ [PvP Create Room Error]:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to create room' });
  }
});

// 11. JOIN PRIVATE ROOM CODE
pvpRouter.post('/room/join', async (req: Request, res: Response) => {
  try {
    const { roomCode, userId, playerName } = req.body || {};
    if (!roomCode) {
      return res.status(400).json({ success: false, error: 'Room code is required' });
    }

    const result = await joinPvPRoom({
      roomCode: String(roomCode),
      userId: String(userId || 'player-2'),
      playerName: playerName ? String(playerName) : undefined,
    });

    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error || 'Failed to join room' });
    }

    res.json({
      success: true,
      session: result.session,
    });
  } catch (err: any) {
    console.error('❌ [PvP Join Room Error]:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to join room' });
  }
});

// 12. GET PRIVATE ROOM STATUS
pvpRouter.get('/room/status/:roomCode', async (req: Request, res: Response) => {
  try {
    const roomCode = String(req.params.roomCode);
    const result = getPvPRoomStatus(roomCode);
    res.json(result);
  } catch (err: any) {
    console.error('❌ [PvP Room Status Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to get room status' });
  }
});

// 13. CANCEL PRIVATE ROOM
pvpRouter.post('/room/cancel', async (req: Request, res: Response) => {
  try {
    const { roomCode, userId } = req.body || {};
    if (roomCode) {
      cancelPvPRoom(String(roomCode), userId ? String(userId) : undefined);
    }
    res.json({ success: true });
  } catch (err: any) {
    console.error('❌ [PvP Cancel Room Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to cancel room' });
  }
});

