const fs = require('fs');
const file = 'src/db/operations/pvp.ts';
let code = fs.readFileSync(file, 'utf8');

const replacement = `export async function matchmakePvP(uId: string, subject: string, stake: number, ranked: boolean, questions: any[], playerName: string): Promise<any> {
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
        return { session: mockSession, opponent: { name: 'AI Scholar', rating: 1200 } };
    }

    const [newDuel] = await db.insert(duel).values({
      challenger_id: uId, subject, status: 'active', questions
    }).returning();
    return { session: { ...newDuel, isBotMatch: true }, opponent: { name: 'AI Scholar', rating: 1200 } };
}`;

code = code.replace(/export async function matchmakePvP[\s\S]*?return { session: { \.\.\.newDuel, isBotMatch: true }, opponent: { name: 'AI Scholar', rating: 1200 } };\n}/m, replacement);
fs.writeFileSync(file, code);
