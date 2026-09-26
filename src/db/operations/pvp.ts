import { db } from './shared.js';
import { pvp_stats, duel } from '../../data/model/pvp.js';
import { user } from '../../data/model/user.js';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';

export async function createDuelChallenge(challengerId: string, challengedId: string, buildingId: string, subject: string, stakeCoins: number, challengerName?: string, challengedName?: string): Promise<any> {
    const [newDuel] = await db.insert(duel).values({
      challenger_id: challengerId, target_id: challengedId, subject, status: 'pending'
    }).returning();
    return newDuel;
}

export async function matchmakePvP(uId: string, subject: string, stake: number, ranked: boolean, questions: any[], playerName: string): Promise<any> {
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uId);
    
    if (!isValidUUID) {
        // Guest user fallback (mock session without DB insert)
        const mockSession = {
            id: crypto.randomUUID(),
            challenger_id: uId,
            target_id: null,
            subject,
            status: 'active',
            challenger_score: 0,
            target_score: 0,
            questions,
            created_at: new Date().toISOString(),
            isBotMatch: true
        };
        return { session: mockSession, opponent: { name: 'AI Scholar', rating: 1200, avatar: '1' } };
    }

    const [newDuel] = await db.insert(duel).values({
      challenger_id: uId, subject, status: 'active', questions
    }).returning();
    return { session: { ...newDuel, isBotMatch: true }, opponent: { name: 'AI Scholar', rating: 1200, avatar: '1' } };
}

export function cancelMatchmaking(userId: string): void {}

export async function getPvPSession(sessionId: string): Promise<any> {
    const [session] = await db.select().from(duel).where(eq(duel.id, sessionId)).limit(1);
    return session || null;
}

export async function submitPvPRound(submission: any): Promise<any> {
    return { isMatchOver: false, opponentFinished: false, roundWinnerId: submission.userId };
}

export async function finishPvPSession(sessionId: string): Promise<any> {
    await db.update(duel).set({ status: 'completed' }).where(eq(duel.id, sessionId));
    return { matchResult: 'win', ratingChange: 15, newRating: 1015 };
}

export async function getUserPvPStats(userId: string): Promise<any> {
    let [stats] = await db.select().from(pvp_stats).where(eq(pvp_stats.user_id, userId)).limit(1);
    if (!stats) {
      [stats] = await db.insert(pvp_stats).values({ user_id: userId }).returning();
    }
    return stats;
}

export async function getPvPLeaderboard(): Promise<any[]> {
    return await db.select({
      user_id: pvp_stats.user_id,
      name: user.name,
      rating: pvp_stats.rating,
      tier: pvp_stats.tier,
      wins: pvp_stats.wins,
    })
    .from(pvp_stats)
    .innerJoin(user, eq(pvp_stats.user_id, user.id))
    .orderBy(desc(pvp_stats.rating))
    .limit(50);
}

export async function getPendingPvPChallenges(userId: string): Promise<any> {
    const received = await db.select().from(duel).where(and(eq(duel.target_id, userId), eq(duel.status, 'pending')));
    const sent = await db.select().from(duel).where(and(eq(duel.challenger_id, userId), eq(duel.status, 'pending')));
    return { received, sent };
}

export async function respondToPvPChallenge(challengeId: string, accept: boolean, questions: any[]): Promise<any> {
    await db.update(duel)
      .set({ status: accept ? 'active' : 'cancelled' })
      .where(eq(duel.id, challengeId));
    return { success: true, session: null };
}

export async function consumePvPChallenge(challengeId: string, sessionId?: string): Promise<void> {}

export async function createPvPRoom(params: any): Promise<any> { return { success: true, roomCode: 'ROOM123', room: {} } as any; }
export async function joinPvPRoom(params: any): Promise<any> { return { roomCode: params.roomCode }; }
export function getPvPRoomStatus(roomCode: string): any { return { success: true, status: 'waiting' }; }
export function cancelPvPRoom(roomCode: string, userId?: string): void {}
export function calculatePvPTier(rating: number): string { return 'Bronze'; }
export function createAiOpponent(subject: string, playerRating: number): any { return { name: 'AI Scholar', rating: 1200, avatar: '1' }; }
export async function saveUserPvPStats(stats: any): Promise<any> { return stats; }
