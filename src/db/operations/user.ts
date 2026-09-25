import { db, computeLevel } from './shared.js';
import { user } from '../../data/model/user.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean> {
    const existing = await db.select().from(user).where(eq(user.username, username)).limit(1);
    if (existing.length > 0) {
        if (excludeUserId && existing[0].id === excludeUserId) return false;
        return true;
    }
    return false;
}

export async function authenticateUser(username: string, password: string, { email }: { email?: string }): Promise<any | null> {
    const [existing] = await db.select().from(user).where(eq(user.username, username)).limit(1);
    if (!existing || !existing.password) return null;
    const isValid = await bcrypt.compare(password, existing.password);
    if (!isValid) return null;
    const [updated] = await db.update(user).set({ last_loggedin: new Date() }).where(eq(user.id, existing.id)).returning();
    return updated;
}

export async function getProfile(userId?: string): Promise<any> {
    if (!userId) throw new Error("No user id");
    const [profile] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
    return profile || null;
}

export async function getAllProfiles(): Promise<any[]> {
    return await db.select().from(user);
}

export async function saveProfile(profile: any): Promise<any> {
    if (profile.password && !profile.password.startsWith('$2b$')) {
        profile.password = await bcrypt.hash(profile.password, 10);
    }
    
    const classId = profile.class_id || '00000000-0000-0000-0000-000000000000'; 

    if (profile.id) {
        const [updated] = await db.update(user).set({
            name: profile.name,
            username: profile.name.toLowerCase().replace(/\s/g, ''),
            password: profile.password,
            class_id: profile.class_id,
            email: profile.email,
            avatar_id: profile.avatar_id?.toString() || "1",
            difficulty: profile.difficulty || "Medium",
            xp: profile.xp,
            level: profile.level,
            coins: profile.coins,
            gems: profile.gems,
            energy: profile.energy,
            streak_days: profile.streak_days,
        }).where(eq(user.id, profile.id)).returning();
        return updated;
    } else {
        const [inserted] = await db.insert(user).values({
            name: profile.name,
            username: profile.name.toLowerCase().replace(/\s/g, ''),
            password: profile.password,
            class_id: classId,
            email: profile.email,
            avatar_id: profile.avatar_id?.toString() || "1",
            difficulty: profile.difficulty || "Medium",
            xp: profile.xp,
            level: profile.level,
            coins: profile.coins,
            gems: profile.gems,
            energy: profile.energy,
            streak_days: profile.streak_days,
        }).returning();
        return inserted;
    }
}

export async function updateProgressAndStats(userId: string, buildingId: string, subject: string, correctCount: number, totalCount: number, difficulty: string = "Medium"): Promise<any> {
    const [profile] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
    if (!profile) throw new Error("Profile not found");

    let xpMultiplier = 100;
    if (difficulty === "Easy") xpMultiplier = 50;
    if (difficulty === "Hard") xpMultiplier = 150;

    const xpEarned = correctCount * xpMultiplier;
    const coinsEarned = correctCount * 10;
    const newXp = profile.xp + xpEarned;
    const newLevel = computeLevel(newXp);
    const newCoins = profile.coins + coinsEarned;

    const [updatedProfile] = await db.update(user)
      .set({ xp: newXp, level: newLevel, coins: newCoins })
      .where(eq(user.id, profile.id))
      .returning();

    return { xpEarned, coinsEarned, newProfile: updatedProfile };
}
