import { db } from './shared.js';
import { guild } from '../../data/model/guild.js';
import { guild_chat } from '../../data/model/guild_chat.js';
import { guild_member } from '../../data/model/guild_member.js';
import { user } from '../../data/model/user.js';
import { eq, desc, sql, and } from 'drizzle-orm';

export async function getPublicGuilds(): Promise<any[]> {
    return await db.select().from(guild);
}

export async function getUserGuild(userId: string): Promise<{guild: any, members: any[], messages: any[]}> {
    // 1. Find the guild the user belongs to
    const membership = await db.select().from(guild_member).where(eq(guild_member.user_id, userId)).limit(1);
    
    // If no explicit membership, maybe they are the leader but didn't get added to the member table?
    let userGuildId: string | null = membership.length > 0 ? membership[0].guild_id : null;
    
    if (!userGuildId) {
        const leaderCheck = await db.select().from(guild).where(eq(guild.leader_id, userId)).limit(1);
        if (leaderCheck.length > 0) {
            userGuildId = leaderCheck[0].id;
            // self-heal: add leader to guild_member
            await db.insert(guild_member).values({ guild_id: userGuildId, user_id: userId }).onConflictDoNothing();
        }
    }

    if (!userGuildId) {
        return { guild: null, members: [], messages: [] };
    }

    const [userGuild] = await db.select().from(guild).where(eq(guild.id, userGuildId)).limit(1);
    
    // Fetch all members of this guild
    const members = await db.select({
        id: user.id,
        name: user.name,
        username: user.username,
        level: user.level,
        xp: user.xp,
        avatar_id: user.avatar_id,
        joined_at: guild_member.joined_at
    })
    .from(guild_member)
    .innerJoin(user, eq(guild_member.user_id, user.id))
    .where(eq(guild_member.guild_id, userGuildId));

    const messages = await db.select({
        id: guild_chat.id,
        guild_id: guild_chat.guild_id,
        from: guild_chat.from,
        content: guild_chat.content,
        sent_at: guild_chat.sent_at,
        sender_name: user.name,
        sender_avatar: user.avatar_id
    })
    .from(guild_chat)
    .leftJoin(user, eq(guild_chat.from, user.id))
    .where(eq(guild_chat.guild_id, userGuildId))
    .orderBy(desc(guild_chat.sent_at))
    .limit(50);

    return { guild: userGuild, members, messages };
}

export async function createGuild(leaderId: string, name: string, tag: string, motto: string): Promise<any> {
    const [newGuild] = await db.insert(guild).values({
      leader_id: leaderId, name, tag, motto, level: 1, member_count: 1
    }).returning();
    
    await db.insert(guild_member).values({
        guild_id: newGuild.id,
        user_id: leaderId
    });
    
    return newGuild;
}

export async function joinGuild(userId: string, guildId: string): Promise<any> {
    await db.insert(guild_member).values({
        guild_id: guildId,
        user_id: userId
    }).onConflictDoNothing();
    
    await db.update(guild)
      .set({ member_count: sql`${guild.member_count} + 1` })
      .where(eq(guild.id, guildId));
      
    return true;
}

export async function leaveGuild(userId: string, guildId: string): Promise<any> {
    await db.delete(guild_member)
      .where(and(eq(guild_member.guild_id, guildId), eq(guild_member.user_id, userId)));
      
    await db.update(guild)
      .set({ member_count: sql`${guild.member_count} - 1` })
      .where(eq(guild.id, guildId));
      
    return true;
}

export async function sendGuildMessage(guildId: string, senderId: string, text: string): Promise<any> {
    const [message] = await db.insert(guild_chat).values({
      guild_id: guildId, from: senderId, content: text
    }).returning();
    return message;
}

export async function getGuildMessages(guildId: string): Promise<any[]> {
    return await db.select({
        id: guild_chat.id,
        from: guild_chat.from,
        content: guild_chat.content,
        sent_at: guild_chat.sent_at,
        sender_name: user.name,
        sender_avatar: user.avatar_id
    })
    .from(guild_chat)
    .leftJoin(user, eq(guild_chat.from, user.id))
    .where(eq(guild_chat.guild_id, guildId))
    .orderBy(desc(guild_chat.sent_at))
    .limit(50);
}
