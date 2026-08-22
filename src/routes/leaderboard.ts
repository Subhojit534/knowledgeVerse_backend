import { Router, Request, Response } from 'express';
import { getAllProfiles } from '../db/supabase.js';

export const leaderboardRouter = Router();

// Helper to filter and map leaderboard entries
async function buildLeaderboard(category: string = 'GLOBAL') {
  const rawProfiles = await getAllProfiles();
  const catUpper = category.toUpperCase();

  let filtered = rawProfiles;
  if (catUpper !== 'GLOBAL' && catUpper !== 'GUILDS') {
    filtered = rawProfiles.filter((p) =>
      p.subjects?.some((s) => s.toUpperCase().includes(catUpper))
    );
    if (filtered.length === 0) {
      filtered = rawProfiles;
    }
  }

  const crownColors = ['#F2CA50', '#C0C0C0', '#CD7F32'];

  return filtered.map((p, index) => {
    const initial = p.name && p.name.length > 0 ? p.name.charAt(0).toUpperCase() : 'W';
    const primarySubject = p.subjects && p.subjects.length > 0 ? p.subjects[0] : 'General Mastery';

    return {
      rank: index + 1,
      id: p.id,
      name: p.name,
      title: p.learning_goal || 'Civilization Architect',
      level: p.level || 1,
      score: p.xp || 0,
      coins: p.coins || 100,
      guildTag: 'ARC',
      streakDays: p.streak_days || 7,
      crownColor: index < 3 ? crownColors[index] : 'transparent',
      avatarInitial: initial,
      avatarColor: index === 0 ? '#F2CA50' : index === 1 ? '#DEB7FF' : '#60A5FA',
      domainMastery: `${primarySubject} (${Math.min(100, 75 + (p.level || 1) * 3)}%)`,
    };
  });
}

// Global Leaderboard Rankings
leaderboardRouter.get('/', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || 'GLOBAL';
    const leaderboard = await buildLeaderboard(category);

    res.json({
      success: true,
      category,
      leaderboard,
    });
  } catch (err) {
    console.error('❌ [Leaderboard Route Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch leaderboard rankings' });
  }
});

// Category-specific Leaderboard Endpoint
leaderboardRouter.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const rawCategory = req.params.category;
    const category = Array.isArray(rawCategory) ? rawCategory[0] : (rawCategory || 'GLOBAL');
    const leaderboard = await buildLeaderboard(category);

    res.json({
      success: true,
      category,
      leaderboard,
    });
  } catch (err) {
    console.error('❌ [Leaderboard Category Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch category leaderboard' });
  }
});
