import { Router } from 'express';
import { getPublicGuilds, getUserGuild, createGuild, joinGuild, leaveGuild, sendGuildMessage, getGuildMessages, } from '../db/supabase.js';
export const guildsRouter = Router();
// Get Public Guilds Directory
guildsRouter.get('/', async (req, res) => {
    try {
        const guilds = await getPublicGuilds();
        res.json({
            success: true,
            guilds,
        });
    }
    catch (err) {
        console.error('❌ [Guilds Directory Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch guilds list' });
    }
});
// Get Guild Messages for Live Polling
guildsRouter.get('/messages', async (req, res) => {
    try {
        const guildId = req.query.guildId;
        if (!guildId) {
            return res.status(400).json({ success: false, error: 'guildId is required' });
        }
        const messages = await getGuildMessages(guildId);
        res.json({
            success: true,
            messages,
        });
    }
    catch (err) {
        console.error('❌ [Guild Messages Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch guild messages' });
    }
});
// Get My Guild Details, Roster & Messages
guildsRouter.get('/my', async (req, res) => {
    try {
        const userId = req.query.userId || 'demo-user-123';
        const data = await getUserGuild(userId);
        res.json({
            success: true,
            guild: data.guild,
            members: data.members,
            messages: data.messages,
        });
    }
    catch (err) {
        console.error('❌ [My Guild Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch my guild data' });
    }
});
// Create Guild
guildsRouter.post('/create', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Create Guild Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to create guild' });
    }
});
// Join Guild
guildsRouter.post('/join', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Join Guild Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to join guild' });
    }
});
// Leave Guild
guildsRouter.post('/leave', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Leave Guild Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to leave guild' });
    }
});
// Send Chat Message to Guild
guildsRouter.post('/chat', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Guild Chat Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to post guild message' });
    }
});
