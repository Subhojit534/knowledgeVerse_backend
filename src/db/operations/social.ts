import { db } from './shared.js';
import { friendship } from '../../data/model/friendship.js';
import { eq, or, and } from 'drizzle-orm';

export async function sendFriendRequest(requesterId: string, addresseeId: string): Promise<any> {
    const [record] = await db.insert(friendship).values({
      requester_id: requesterId, addressee_id: addresseeId, status: 'PENDING'
    }).returning();
    return record;
}

export async function respondFriendRequest(friendshipId: string, accept: boolean): Promise<any> {
    await db.update(friendship)
      .set({ status: accept ? 'ACCEPTED' : 'BLOCKED' })
      .where(eq(friendship.id, friendshipId));
    return { success: true, session: null };
}

export async function getFriendsData(userId: string): Promise<{friends: any[], pendingReceived: any[], pendingSent: any[], availableExplorers: any[]}> {
    const friends = await db.select().from(friendship).where(
      and(eq(friendship.status, 'ACCEPTED'), or(eq(friendship.requester_id, userId), eq(friendship.addressee_id, userId)))
    );
    return { friends, pendingReceived: [], pendingSent: [], availableExplorers: [] };
}
