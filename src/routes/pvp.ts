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
} from '../db/operations.js';


import { generateLearningContentWithGroq } from '../services/groq.js';
import { drizzleClient as db } from '../db/drizzle_client.js';
import { question } from '../data/model/question.js';
import { option } from '../data/model/option.js';
import { sql, eq } from 'drizzle-orm';
import { MCQuestion } from '../types/index.js';

export const pvpRouter = Router();

/**
 * Helper to fetch 5 quiz questions for a PvP subject match instantly (no blocking network calls).
 */
async function getPvPQuestions(subject: string, grade: string = 'Class 10', curriculum: string = 'CBSE'): Promise<any[]> {
  try {
    const randomQuestions = await db.select().from(question).orderBy(sql`RANDOM()`).limit(5);
    const formattedQuestions = [];
    for (const q of randomQuestions) {
      const opts = await db.select().from(option).where(eq(option.question_id, q.id));
      const correctAnswer = opts.find((o: any) => o.is_correct)?.answer || '';
      formattedQuestions.push({
        id: q.id,
        question: q.question,
        options: opts.map((o: any) => o.answer),
        correct_answer: correctAnswer,
        explanation: 'Keep learning!',
      });
    }
    return formattedQuestions as any;
  } catch (err) {
    console.error('PvP Question Fetch Error', err);
  }
  return [];
}



// 1. MATCHMAKING QUEUE / INSTANT AI MATCH (Practice) / REAL DUEL POOL
/**
 * @swagger
 * /api/pvp/matchmake:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/matchmake/cancel:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/session/{sessionId}:
 *   get:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/session/{sessionId}/round:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/session/{sessionId}/finish:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/stats/{userId}:
 *   get:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/leaderboard:
 *   get:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/challenges:
 *   get:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/challenge:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/challenges/respond:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/challenges/consume:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/room/create:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/room/join:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/room/status/{roomCode}:
 *   get:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /api/pvp/room/cancel:
 *   post:
 *     summary: Endpoint for pvp
 *     tags: [Pvp]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successful response
 */
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

