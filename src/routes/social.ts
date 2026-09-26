import { Router, Request, Response } from 'express';
import {
  sendFriendRequest,
  respondFriendRequest,
  createDuelChallenge,
  getFriendsData,
  getUserGuild,
  getPublicGuilds,
} from '../db/operations.js';

export const socialRouter = Router();

// Fast Unified Social Dashboard (Single-hop parallel load < 0.3s)
/**
 * @swagger
 * /api/social/dashboard:
 *   get:
 *     summary: Get social dashboard data
 *     tags: [Social]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user (defaults to demo-user-123)
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
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pendingReceived:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pendingSent:
 *                   type: array
 *                   items:
 *                     type: object
 *                 availableExplorers:
 *                   type: array
 *                   items:
 *                     type: object
 *                 myGuild:
 *                   type: object
 *                 guildMembers:
 *                   type: array
 *                   items:
 *                     type: object
 *                 guildMessages:
 *                   type: array
 *                   items:
 *                     type: object
 *                 publicGuilds:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
socialRouter.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';

    // Execute all database queries in parallel on server
    const [friendsData, myGuildData, publicGuilds] = await Promise.all([
      getFriendsData(userId),
      getUserGuild(userId),
      getPublicGuilds(),
    ]);

    res.json({
      success: true,
      friends: friendsData.friends,
      pendingReceived: friendsData.pendingReceived,
      pendingSent: friendsData.pendingSent,
      availableExplorers: friendsData.availableExplorers,
      myGuild: myGuildData.guild,
      guildMembers: myGuildData.members,
      guildMessages: myGuildData.messages,
      publicGuilds: publicGuilds,
    });
  } catch (err) {
    console.error('❌ [Social Dashboard Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch social dashboard' });
  }
});

// Get Friends, Pending Requests & Explorers List
/**
 * @swagger
 * /api/social/friends:
 *   get:
 *     summary: Get Friends, Pending Requests & Explorers List
 *     tags: [Social]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user (defaults to demo-user-123)
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
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pendingReceived:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pendingSent:
 *                   type: array
 *                   items:
 *                     type: object
 *                 availableExplorers:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
socialRouter.get('/friends', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';
    const data = await getFriendsData(userId);

    res.json({
      success: true,
      friends: data.friends,
      pendingReceived: data.pendingReceived,
      pendingSent: data.pendingSent,
      availableExplorers: data.availableExplorers,
    });
  } catch (err) {
    console.error('❌ [Social Friends Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch friends data' });
  }
});

// Send Friend Request
/**
 * @swagger
 * /api/social/friends/request:
 *   post:
 *     summary: Send Friend Request
 *     tags: [Social]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addresseeId
 *             properties:
 *               requesterId:
 *                 type: string
 *               addresseeId:
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
 *                 friendship:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
socialRouter.post('/friends/request', async (req: Request, res: Response) => {
  try {
    const { requesterId, addresseeId } = req.body || {};
    const rId = requesterId || 'demo-user-123';

    if (!addresseeId) {
      return res.status(400).json({ success: false, error: 'addresseeId is required' });
    }

    const record = await sendFriendRequest(rId, addresseeId);

    res.json({
      success: true,
      message: 'Friend request sent successfully',
      friendship: record,
    });
  } catch (err) {
    console.error('❌ [Send Friend Request Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to send friend request' });
  }
});

// Respond to Friend Request (Accept / Reject)
/**
 * @swagger
 * /api/social/friends/respond:
 *   post:
 *     summary: Respond to Friend Request (Accept / Reject)
 *     tags: [Social]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendshipId
 *             properties:
 *               friendshipId:
 *                 type: string
 *               accept:
 *                 type: boolean
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
socialRouter.post('/friends/respond', async (req: Request, res: Response) => {
  try {
    const { friendshipId, accept } = req.body || {};
    if (!friendshipId) {
      return res.status(400).json({ success: false, error: 'friendshipId is required' });
    }

    const success = await respondFriendRequest(friendshipId, accept !== false);

    res.json({
      success: true,
      message: accept !== false ? 'Friend request accepted' : 'Friend request declined',
    });
  } catch (err) {
    console.error('❌ [Respond Friend Request Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to respond to friend request' });
  }
});

// Challenge Friend to a Quiz Duel
/**
 * @swagger
 * /api/social/duel/challenge:
 *   post:
 *     summary: Challenge Friend to a Quiz Duel
 *     tags: [Social]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - challengedId
 *               - buildingId
 *             properties:
 *               challengerId:
 *                 type: string
 *               challengedId:
 *                 type: string
 *               buildingId:
 *                 type: string
 *               subject:
 *                 type: string
 *               stakeCoins:
 *                 type: number
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
 *                 duel:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
socialRouter.post('/duel/challenge', async (req: Request, res: Response) => {
  try {
    const { challengerId, challengedId, buildingId, subject, stakeCoins } = req.body || {};
    const cId = challengerId || 'demo-user-123';

    if (!challengedId || !buildingId) {
      return res.status(400).json({
        success: false,
        error: 'challengedId and buildingId are required for duel challenge',
      });
    }

    const duel = await createDuelChallenge(
      cId,
      challengedId,
      buildingId,
      subject || 'General Academic',
      stakeCoins || 50
    );

    res.json({
      success: true,
      message: 'Quiz duel challenge created successfully!',
      duel,
    });
  } catch (err) {
    console.error('❌ [Duel Challenge Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to challenge friend to duel' });
  }
});
