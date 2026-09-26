import { db, computeLevel } from './shared.js';
import { user } from '../../data/model/user.js';
import { classTable } from '../../data/model/class.js';
import { eq, and, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean> {
    const normalized = (username || '').toLowerCase().replace(/\s/g, '');
    const existing = await db.select().from(user).where(or(eq(user.username, normalized), eq(user.username, username))).limit(1);
    if (existing.length > 0) {
        if (excludeUserId && existing[0].id === excludeUserId) return false;
        return true;
    }
    return false;
}

export async function authenticateUser(username: string, password: string, { email }: { email?: string }): Promise<any | null> {
    const normalized = (username || '').toLowerCase().replace(/\s/g, '');
    const [existing] = await db.select().from(user)
        .where(or(eq(user.username, normalized), eq(user.username, username), eq(user.name, username)))
        .limit(1);
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

    let classId = profile.class_id;
    if (!classId) {
        try {
            const gradeName = profile.grade || 'Class 10';
            const boardName = (profile.curriculum || 'CBSE').toUpperCase();
            const found = await db.select().from(classTable)
                .where(and(eq(classTable.name, gradeName), eq(classTable.board, boardName as any)))
                .limit(1);
            if (found.length > 0) {
                classId = found[0].id;
            } else {
                const anyClass = await db.select().from(classTable).limit(1);
                if (anyClass.length > 0) {
                    classId = anyClass[0].id;
                }
            }
        } catch (e) {
            console.error('⚠️ [saveProfile]: Failed to resolve class_id fallback:', e);
        }
    }

    const username = (profile.name || '').toLowerCase().replace(/\s/g, '');
    let targetUserId = profile.id;

    if (!targetUserId && username) {
        const [existing] = await db.select().from(user).where(eq(user.username, username)).limit(1);
        if (existing) {
            targetUserId = existing.id;
            if (!classId) classId = existing.class_id;
        }
    }

    if (targetUserId) {
        const updateData: any = {
            name: profile.name,
            username: username,
            avatar_id: profile.avatar_id?.toString() || "1",
            difficulty: profile.difficulty || "Medium",
        };
        if (profile.password) updateData.password = profile.password;
        if (classId) updateData.class_id = classId;
        if (profile.email) updateData.email = profile.email;
        if (profile.xp !== undefined) updateData.xp = profile.xp;
        if (profile.level !== undefined) updateData.level = profile.level;
        if (profile.coins !== undefined) updateData.coins = profile.coins;
        if (profile.gems !== undefined) updateData.gems = profile.gems;
        if (profile.energy !== undefined) updateData.energy = profile.energy;
        if (profile.streak_days !== undefined) updateData.streak_days = profile.streak_days;

        const [updated] = await db.update(user).set(updateData).where(eq(user.id, targetUserId)).returning();
        return updated;
    } else {
        const [inserted] = await db.insert(user).values({
            name: profile.name,
            username: username,
            password: profile.password,
            class_id: classId,
            email: profile.email,
            avatar_id: profile.avatar_id?.toString() || "1",
            difficulty: profile.difficulty || "Medium",
            xp: profile.xp ?? 150,
            level: profile.level ?? 1,
            coins: profile.coins ?? 500,
            gems: profile.gems ?? 25,
            energy: profile.energy ?? 100,
            streak_days: profile.streak_days ?? 1,
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
