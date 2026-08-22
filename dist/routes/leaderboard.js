import { Router } from 'express';
import { getAllProfiles, getPublicGuilds } from '../db/supabase.js';
export const leaderboardRouter = Router();
function getCanonicalSubject(cat) {
    const c = cat.trim().toUpperCase();
    if (c.includes('MATH'))
        return 'Mathematics';
    if (c.includes('PHYSIC'))
        return 'Physics';
    if (c.includes('CHEM'))
        return 'Chemistry';
    if (c.includes('BIO'))
        return 'Biology';
    if (c.includes('HIST'))
        return 'History';
    if (c.includes('CS') || c.includes('CODE') || c.includes('COMP'))
        return 'Computer Science';
    return null;
}
// Helper to filter, calculate scores, and sort leaderboard entries by category
async function buildLeaderboard(category = 'GLOBAL') {
    const catUpper = category.trim().toUpperCase();
    const crownColors = ['#F2CA50', '#C0C0C0', '#CD7F32'];
    // 1. GUILDS LEADERBOARD
    if (catUpper === 'GUILDS') {
        const guilds = await getPublicGuilds();
        const sortedGuilds = [...guilds].sort((a, b) => ((b.level || 1) * 1000 + (b.member_count || 1) * 100) - ((a.level || 1) * 1000 + (a.member_count || 1) * 100));
        return sortedGuilds.map((g, index) => {
            const initial = g.tag && g.tag.length > 0 ? g.tag.charAt(0).toUpperCase() : 'G';
            return {
                rank: index + 1,
                id: g.id,
                name: g.name,
                title: g.motto || 'Order of Scholars',
                level: g.level || 1,
                score: (g.level || 1) * 1250 + (g.member_count || 1) * 150,
                coins: 500,
                guildTag: g.tag,
                streakDays: 14,
                crownColor: index < 3 ? crownColors[index] : 'transparent',
                avatarInitial: initial,
                avatarColor: index === 0 ? '#F2CA50' : index === 1 ? '#DEB7FF' : '#60A5FA',
                domainMastery: `${g.member_count}/${g.max_members} Members`,
            };
        });
    }
    const rawProfiles = await getAllProfiles();
    const canonicalSubject = getCanonicalSubject(catUpper);
    // 2. SUBJECT-SPECIFIC LEADERBOARD (Math, Physics, Chemistry, Biology, History, CS)
    if (canonicalSubject) {
        const subjectScored = rawProfiles.map((p) => {
            const studiesSubject = p.subjects?.some((s) => s.toLowerCase().includes(canonicalSubject.toLowerCase())) ?? false;
            const baseSubjectXp = studiesSubject
                ? Math.round((p.xp || 150) * 1.0)
                : Math.round((p.xp || 150) * 0.45);
            const subjectLevel = Math.max(1, Math.floor(baseSubjectXp / 100) + 1);
            const masteryPct = studiesSubject
                ? Math.min(99, 65 + subjectLevel * 4)
                : Math.min(50, 20 + subjectLevel * 2);
            return {
                profile: p,
                subjectScore: baseSubjectXp,
                subjectLevel: subjectLevel,
                masteryPct: masteryPct,
                studiesSubject: studiesSubject,
            };
        });
        // Sort descending by subject score
        subjectScored.sort((a, b) => b.subjectScore - a.subjectScore);
        return subjectScored.map((item, index) => {
            const p = item.profile;
            const initial = p.name && p.name.length > 0 ? p.name.charAt(0).toUpperCase() : 'W';
            return {
                rank: index + 1,
                id: p.id,
                name: p.name,
                title: item.studiesSubject ? `${canonicalSubject} Scholar` : (p.learning_goal || 'Explorer'),
                level: item.subjectLevel,
                score: item.subjectScore,
                coins: p.coins || 500,
                guildTag: 'ARC',
                streakDays: p.streak_days || 1,
                crownColor: index < 3 ? crownColors[index] : 'transparent',
                avatarInitial: initial,
                avatarColor: index === 0 ? '#F2CA50' : index === 1 ? '#DEB7FF' : '#60A5FA',
                domainMastery: `${canonicalSubject} (${item.masteryPct}%)`,
            };
        });
    }
    // 3. GLOBAL OVERALL LEADERBOARD
    const sortedGlobal = [...rawProfiles].sort((a, b) => (b.xp || 0) - (a.xp || 0));
    return sortedGlobal.map((p, index) => {
        const initial = p.name && p.name.length > 0 ? p.name.charAt(0).toUpperCase() : 'W';
        const primarySubject = p.subjects && p.subjects.length > 0 ? p.subjects[0] : 'All Domains';
        return {
            rank: index + 1,
            id: p.id,
            name: p.name,
            title: p.learning_goal || 'Civilization Architect',
            level: p.level || 1,
            score: p.xp || 0,
            coins: p.coins || 500,
            guildTag: 'ARC',
            streakDays: p.streak_days || 1,
            crownColor: index < 3 ? crownColors[index] : 'transparent',
            avatarInitial: initial,
            avatarColor: index === 0 ? '#F2CA50' : index === 1 ? '#DEB7FF' : '#60A5FA',
            domainMastery: `${primarySubject} (${Math.min(100, 75 + (p.level || 1) * 3)}%)`,
        };
    });
}
// Global Leaderboard Rankings
leaderboardRouter.get('/', async (req, res) => {
    try {
        const category = req.query.category || 'GLOBAL';
        const leaderboard = await buildLeaderboard(category);
        res.json({
            success: true,
            category,
            leaderboard,
        });
    }
    catch (err) {
        console.error('❌ [Leaderboard Route Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch leaderboard rankings' });
    }
});
// Category-specific Leaderboard Endpoint
leaderboardRouter.get('/category/:category', async (req, res) => {
    try {
        const rawCategory = req.params.category;
        const category = Array.isArray(rawCategory) ? rawCategory[0] : (rawCategory || 'GLOBAL');
        const leaderboard = await buildLeaderboard(category);
        res.json({
            success: true,
            category,
            leaderboard,
        });
    }
    catch (err) {
        console.error('❌ [Leaderboard Category Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch category leaderboard' });
    }
});
