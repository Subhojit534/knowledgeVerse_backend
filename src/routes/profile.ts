import { Router, Request, Response } from 'express';
import { getProfile, saveProfile, isUsernameTaken, getAllProfiles } from '../db/supabase.js';

export const profileRouter = Router();

async function handleIntro(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const name = (body.name || 'Wizard Student').trim();
    const userId = (body.id && body.id !== 'demo-user-123') ? body.id : undefined;

    // Verify unique username if new account
    const taken = await isUsernameTaken(name, userId);
    if (taken) {
      return res.status(400).json({
        success: false,
        error: `The explorer name "${name}" is already taken! Please choose another name.`,
      });
    }

    const requestedSubjects = Array.isArray(body.subjects) && body.subjects.length > 0
      ? body.subjects
      : ['Computer Science', 'Mathematics'];

    const updatedProfile = await saveProfile({
      id: userId,
      name: name,
      password: body.password || 'password123',
      grade: body.grade || 'Class 10',
      curriculum: body.curriculum || 'CBSE',
      subjects: requestedSubjects,
      difficulty: body.difficulty || 'Balanced',
      world_theme: body.world_theme || 'Green Highlands',
      learning_goal: body.learning_goal || 'Master all academic domains',
      avatar_id: body.avatar_index ?? 0,
      xp: 150,
      level: 1,
      coins: 500,
      gems: 25,
      energy: 100,
      streak_days: 1,
    });

    const subjectsList = updatedProfile.subjects || requestedSubjects;
    const theme = updatedProfile.world_theme || 'Green Highlands';
    const subjectsStr = subjectsList.join(', ');

    const narration = `${name} — the magic realm of KnowledgeVerse awaits you! Tonight the grand lanterns are lit across ${theme}. You are enrolled to master ${subjectsStr}. Every lesson you complete lays another stone for your academy. Step inside — your adventure begins now!`;

    res.json({
      success: true,
      message: 'Onboarding profile saved successfully',
      narration: narration,
      audio_url: null,
      audio_available: false,
      source: 'backend',
      cache_key: `intro_${updatedProfile.id}`,
      profile: {
        ...updatedProfile,
        subjects: subjectsList,
      },
    });
  } catch (err) {
    console.error('❌ [Profile Route Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to save onboarding profile' });
  }
}

profileRouter.post('/', handleIntro);
profileRouter.post('/intro', handleIntro);

// Fetch All Profiles (For Social & Leaderboards)
profileRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const profiles = await getAllProfiles();
    res.json({ success: true, profiles });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch all profiles' });
  }
});

// Fetch Current Profile
profileRouter.get('/me', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';
    const profile = await getProfile(userId);
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// Update Current Profile Customizations & Stats
profileRouter.put('/me', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || (req.body?.id as string) || 'demo-user-123';
    const existing = await getProfile(userId);
    const updates = req.body || {};

    const updated = await saveProfile({
      ...existing,
      name: updates.name ? updates.name.trim() : existing.name,
      learning_goal: updates.learning_goal || existing.learning_goal,
      world_theme: updates.world_theme || existing.world_theme,
      avatar_id: updates.avatar_index !== undefined ? updates.avatar_index : existing.avatar_id,
      grade: updates.grade || existing.grade,
      curriculum: updates.curriculum || existing.curriculum,
      difficulty: updates.difficulty || existing.difficulty,
      xp: updates.xp !== undefined ? Number(updates.xp) : existing.xp,
      level: updates.level !== undefined ? Number(updates.level) : existing.level,
      coins: updates.coins !== undefined ? Number(updates.coins) : existing.coins,
      gems: updates.gems !== undefined ? Number(updates.gems) : existing.gems,
      energy: updates.energy !== undefined ? Number(updates.energy) : existing.energy,
      streak_days: updates.streak_days !== undefined ? Number(updates.streak_days) : (updates.streakDays !== undefined ? Number(updates.streakDays) : existing.streak_days),
      subjects: Array.isArray(updates.subjects) && updates.subjects.length > 0 ? updates.subjects : existing.subjects,
    });

    res.json({
      success: true,
      message: 'Profile updated and saved to DB successfully',
      profile: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// Fetch Profile by ID
profileRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const rawId = req.params.id;
    const profileId = Array.isArray(rawId) ? rawId[0] : rawId;
    const profile = await getProfile(profileId);
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});
