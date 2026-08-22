import { Router } from 'express';
import { authenticateUser, isUsernameTaken, saveProfile } from '../db/supabase.js';
export const authRouter = Router();
// Register Endpoint
authRouter.post('/register', async (req, res) => {
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
            difficulty: difficulty || 'Balanced',
            world_theme: world_theme || 'Green Highlands',
            learning_goal: learning_goal || 'Master all academic domains',
            subjects: Array.isArray(subjects) && subjects.length > 0 ? subjects : ['Mathematics', 'Computer Science'],
            avatar_index: 0,
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
    }
    catch (err) {
        console.error('❌ [Register Error]:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to register new explorer account',
        });
    }
});
// Login Endpoint
authRouter.post('/login', async (req, res) => {
    try {
        const { name, username, password } = req.body || {};
        const inputName = (name || username || '').trim();
        if (!inputName || !password) {
            return res.status(400).json({
                success: false,
                error: 'Explorer Name and Password are required!',
            });
        }
        const profile = await authenticateUser(inputName, password);
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
    }
    catch (err) {
        console.error('❌ [Login Error]:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to authenticate user',
        });
    }
});
