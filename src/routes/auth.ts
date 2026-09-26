import { Router, Request, Response } from 'express';
import { authenticateUser, isUsernameTaken, saveProfile } from '../db/operations.js';

export const authRouter = Router();

// Register Endpoint
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new explorer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               grade:
 *                 type: string
 *               curriculum:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               world_theme:
 *                 type: string
 *               learning_goal:
 *                 type: string
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *       400:
 *         description: Bad request (missing fields or username taken)
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
 *       500:
 *         description: Internal server error
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
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, password, grade, curriculum, difficulty, world_theme, learning_goal, subjects } = req.body || {};
    const inputName = (name || '').trim();

    if (!inputName || !password) {
      return res.status(400).json({
        success: false,
        error: 'Explorer Name and Password are required!',
      });
    }

    const taken = await isUsernameTaken(inputName);
    if (taken) {
      return res.status(400).json({
        success: false,
        error: `The explorer name "${inputName}" is already taken! Please choose another.`,
      });
    }

    const newProfile = await saveProfile({
      name: inputName,
      password: password,
      grade: grade || 'Class 10',
      curriculum: curriculum || 'CBSE',
      difficulty: difficulty || 'Medium',
      world_theme: world_theme || 'Green Highlands',
      learning_goal: learning_goal || 'Master all academic domains',
      subjects: Array.isArray(subjects) && subjects.length > 0 ? subjects : ['Mathematics', 'Computer Science'],
      avatar_id: 0,
      xp: 150,
      level: 1,
      coins: 500,
      gems: 25,
      energy: 100,
      streak_days: 1,
    });

    res.json({
      success: true,
      message: 'Explorer registered successfully!',
      profile: newProfile,
    });
  } catch (err: any) {
    console.error('❌ [Register Error]:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to register new explorer account: ' + (err.message || err),
    });
  }
});

// Login Endpoint
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an explorer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *       400:
 *         description: Missing credentials
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
 *       401:
 *         description: Invalid credentials
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
 *       500:
 *         description: Internal server error
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
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { name, username, password, email } = req.body || {};
    const inputName = (name || username || '').trim();

    if (!inputName || !password) {
      return res.status(400).json({
        success: false,
        error: 'Explorer Name and Password are required!',
      });
    }

    const profile = await authenticateUser(inputName, password, { email: email });
    if (!profile) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Explorer Name or Password. Please check your credentials.',
      });
    }

    res.json({
      success: true,
      message: 'Authentication successful',
      profile,
    });
  } catch (err: any) {
    console.error('❌ [Login Error]:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to authenticate user',
    });
  }
});
