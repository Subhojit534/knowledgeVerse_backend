import { db } from './shared.js';
import { guild } from '../../data/model/guild.js';
import { guild_chat } from '../../data/model/guild_chat.js';
import { eq, desc } from 'drizzle-orm';

export async function getPublicGuilds(): Promise<any[]> {
    return await db.select().from(guild);
}

export async function getUserGuild(userId: string): Promise<{guild: any, members: any[], messages: any[]}> {
    const guilds = await db.select().from(guild);
    return { guild: guilds[0], members: [], messages: [] };
}

export async function createGuild(leaderId: string, name: string, tag: string, motto: string): Promise<any> {
    const [newGuild] = await db.insert(guild).values({
      leader_id: leaderId, name, tag, motto, level: 1
    }).returning();
    return newGuild;
}

export async function joinGuild(userId: string, guildId: string): Promise<any> {
    return true; // Simplified for MVP
}

export async function leaveGuild(userId: string, guildId: string): Promise<any> {
    return true; // Simplified for MVP
}

export async function sendGuildMessage(guildId: string, senderId: string, text: string): Promise<any> {
    const [message] = await db.insert(guild_chat).values({
      guild_id: guildId, from: senderId, content: text
    }).returning();
    return message;
}

export async function getGuildMessages(guildId: string): Promise<any[]> {
    return await db.select().from(guild_chat).where(eq(guild_chat.guild_id, guildId)).orderBy(desc(guild_chat.sent_at)).limit(50);
}
