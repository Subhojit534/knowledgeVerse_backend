import { db } from './shared.js';
import { classTable } from '../../data/model/class.js';
import { eq } from 'drizzle-orm';

export async function getClassesByBoard(board: any): Promise<any[]> {
    return await db.select().from(classTable).where(eq(classTable.board, board));
}

export async function getAllClasses(): Promise<any[]> {
    return await db.select().from(classTable);
}
