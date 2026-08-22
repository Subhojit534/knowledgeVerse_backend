import { Router } from 'express';
import { sendFriendRequest, respondFriendRequest, createDuelChallenge, getFriendsData, getUserGuild, getPublicGuilds, } from '../db/supabase.js';
export const socialRouter = Router();
// Fast Unified Social Dashboard (Single-hop parallel load < 0.3s)
socialRouter.get('/dashboard', async (req, res) => {
    try {
        const userId = req.query.userId || 'demo-user-123';
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
    }
    catch (err) {
        console.error('❌ [Social Dashboard Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch social dashboard' });
    }
});
// Get Friends, Pending Requests & Explorers List
socialRouter.get('/friends', async (req, res) => {
    try {
        const userId = req.query.userId || 'demo-user-123';
        const data = await getFriendsData(userId);
        res.json({
            success: true,
            friends: data.friends,
            pendingReceived: data.pendingReceived,
            pendingSent: data.pendingSent,
            availableExplorers: data.availableExplorers,
        });
    }
    catch (err) {
        console.error('❌ [Social Friends Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch friends data' });
    }
});
// Send Friend Request
socialRouter.post('/friends/request', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Send Friend Request Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to send friend request' });
    }
});
// Respond to Friend Request (Accept / Reject)
socialRouter.post('/friends/respond', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Respond Friend Request Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to respond to friend request' });
    }
});
// Challenge Friend to a Quiz Duel
socialRouter.post('/duel/challenge', async (req, res) => {
    try {
        const { challengerId, challengedId, buildingId, subject, stakeCoins } = req.body || {};
        const cId = challengerId || 'demo-user-123';
        if (!challengedId || !buildingId) {
            return res.status(400).json({
                success: false,
                error: 'challengedId and buildingId are required for duel challenge',
            });
        }
        const duel = await createDuelChallenge(cId, challengedId, buildingId, subject || 'General Academic', stakeCoins || 50);
        res.json({
            success: true,
            message: 'Quiz duel challenge created successfully!',
            duel,
        });
    }
    catch (err) {
        console.error('❌ [Duel Challenge Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to challenge friend to duel' });
    }
});
