import { Router, Request, Response } from 'express';
import { getProfile, getAllProfiles, saveProfile } from '../db/operations.js';

export const profileRouter = Router();

/**
 * @swagger
 * /api/profile/id/{userId}:
 *   get:
 *     summary: Get a user's profile
 *     description: Retrieve a user profile by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
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
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     level:
 *                       type: number
 *                     xp:
 *                       type: number
 */
profileRouter.get('/id/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Invalid user ID',
      });
      return;
    }

    const profile = await getProfile(userId);
    res.json({ success: true, profile });
  } catch (err: any) {
    console.error('❌ [Profile Fetch Error]:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
    });
  }
});

/**
 * @swagger
 * /api/profile/all:
 *   get:
 *     summary: Get all user profiles
 *     description: Retrieve all user profiles from the database.
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
 *                 profiles:
 *                   type: array
 *                   items:
 *                     type: object
 */
profileRouter.get('/all', async (_req: Request, res: Response) => {
  try {
    const profiles = await getAllProfiles();
    res.json({ success: true, profiles });
  } catch (err: any) {
    console.error('❌ [Profiles Fetch Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch user profiles' });
  }
});

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Save or update a user profile
 *     description: Create a new profile or update an existing one.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
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
 *                 profile:
 *                   type: object
 */
profileRouter.post('/', async (req: Request, res: Response) => {
  try {
    const profileData = req.body || {};
    const updated = await saveProfile(profileData);
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    console.error('❌ [Profile Save Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to save profile' });
  }
});
