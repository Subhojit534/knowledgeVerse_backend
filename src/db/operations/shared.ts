import { drizzleClient as db } from '../drizzle_client.js';
import crypto from 'crypto';

export function computeLevel(totalXp: number): number {
    return Math.floor(Math.sqrt(totalXp / 100)) + 1;
}

export { db, crypto };
