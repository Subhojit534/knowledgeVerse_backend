import { Router, Request, Response } from 'express';
import {
  getPublicGuilds,
  getUserGuild,
  createGuild,
  joinGuild,
  leaveGuild,
  sendGuildMessage,
  getGuildMessages,
} from '../db/operations.js';

export const guildsRouter = Router();

// Get Public Guilds Directory
/**
 * @swagger
 * /api/guilds:
 *   get:
 *     summary: Get Public Guilds Directory
 *     tags: [Guilds]
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
 *                 guilds:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to fetch guilds list
 */
guildsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const guilds = await getPublicGuilds();
    res.json({
      success: true,
      guilds,
    });
  } catch (err) {
    console.error('❌ [Guilds Directory Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch guilds list' });
  }
});

// Get Guild Messages for Live Polling
/**
 * @swagger
 * /api/guilds/messages:
 *   get:
 *     summary: Get Guild Messages for Live Polling
 *     tags: [Guilds]
 *     parameters:
 *       - in: query
 *         name: guildId
 *         required: true
 *         schema:
 *           type: string
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
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: guildId is required
 *       500:
 *         description: Failed to fetch guild messages
 */
guildsRouter.get('/messages', async (req: Request, res: Response) => {
  try {
    const guildId = req.query.guildId as string;
    if (!guildId) {
      return res.status(400).json({ success: false, error: 'guildId is required' });
    }
    const messages = await getGuildMessages(guildId);
    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error('❌ [Guild Messages Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch guild messages' });
  }
});

// Get My Guild Details, Roster & Messages
/**
 * @swagger
 * /api/guilds/my:
 *   get:
 *     summary: Get My Guild Details, Roster & Messages
 *     tags: [Guilds]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
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
 *                 guild:
 *                   type: object
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to fetch my guild data
 */
guildsRouter.get('/my', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';
    const data = await getUserGuild(userId);

    res.json({
      success: true,
      guild: data.guild,
      members: data.members,
      messages: data.messages,
    });
  } catch (err) {
    console.error('❌ [My Guild Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch my guild data' });
  }
});

// Create Guild
/**
 * @swagger
 * /api/guilds/create:
 *   post:
 *     summary: Create Guild
 *     tags: [Guilds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - tag
 *             properties:
 *               leaderId:
 *                 type: string
 *               name:
 *                 type: string
 *               tag:
 *                 type: string
 *               motto:
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
 *                 guild:
 *                   type: object
 *       400:
 *         description: Guild Name and Tag are required
 *       500:
 *         description: Failed to create guild
 */
guildsRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { leaderId, name, tag, motto } = req.body || {};
    const lId = leaderId || 'demo-user-123';

    if (!name || !tag) {
      return res.status(400).json({ success: false, error: 'Guild Name and Tag are required' });
    }

    const newGuild = await createGuild(lId, name, tag, motto || 'Knowledge is the Ultimate Spell');

    res.json({
      success: true,
      message: `Guild "${name}" created successfully!`,
      guild: newGuild,
    });
  } catch (err) {
    console.error('❌ [Create Guild Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to create guild' });
  }
});

// Join Guild
/**
 * @swagger
 * /api/guilds/join:
 *   post:
 *     summary: Join Guild
 *     tags: [Guilds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guildId
 *             properties:
 *               userId:
 *                 type: string
 *               guildId:
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
 *       400:
 *         description: guildId is required
 *       404:
 *         description: Guild not found or join failed
 *       500:
 *         description: Failed to join guild
 */
guildsRouter.post('/join', async (req: Request, res: Response) => {
  try {
    const { userId, guildId } = req.body || {};
    const uId = userId || 'demo-user-123';

    if (!guildId) {
      return res.status(400).json({ success: false, error: 'guildId is required' });
    }

    const success = await joinGuild(uId, guildId);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Guild not found or join failed' });
    }

    res.json({
      success: true,
      message: 'Successfully joined the guild!',
    });
  } catch (err) {
    console.error('❌ [Join Guild Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to join guild' });
  }
});

// Leave Guild
/**
 * @swagger
 * /api/guilds/leave:
 *   post:
 *     summary: Leave Guild
 *     tags: [Guilds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guildId
 *             properties:
 *               userId:
 *                 type: string
 *               guildId:
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
 *       400:
 *         description: guildId is required
 *       500:
 *         description: Failed to leave guild
 */
guildsRouter.post('/leave', async (req: Request, res: Response) => {
  try {
    const { userId, guildId } = req.body || {};
    const uId = userId || 'demo-user-123';

    if (!guildId) {
      return res.status(400).json({ success: false, error: 'guildId is required' });
    }

    const success = await leaveGuild(uId, guildId);
    res.json({
      success,
      message: 'Successfully left the guild.',
    });
  } catch (err) {
    console.error('❌ [Leave Guild Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to leave guild' });
  }
});

// Send Chat Message to Guild
/**
 * @swagger
 * /api/guilds/chat:
 *   post:
 *     summary: Send Chat Message to Guild
 *     tags: [Guilds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guildId
 *               - text
 *             properties:
 *               guildId:
 *                 type: string
 *               senderId:
 *                 type: string
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
 *                 message:
 *                   type: object
 *       400:
 *         description: guildId and text are required
 *       500:
 *         description: Failed to post guild message
 */
guildsRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { guildId, senderId, text } = req.body || {};
    const sId = senderId || 'demo-user-123';

    if (!guildId || !text) {
      return res.status(400).json({ success: false, error: 'guildId and text are required' });
    }

    const message = await sendGuildMessage(guildId, sId, text);

    res.json({
      success: true,
      message,
    });
  } catch (err) {
    console.error('❌ [Guild Chat Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to post guild message' });
  }
});
