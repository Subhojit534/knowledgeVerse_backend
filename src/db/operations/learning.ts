import { db } from './shared.js';
import { question } from '../../data/model/question.js';
import { option } from '../../data/model/option.js';
import { subtopic } from '../../data/model/subtopic.js';
import { eq, sql, inArray } from 'drizzle-orm';

export async function getRandomQuestions(subtopicId?: string, topicId?: string, limit: number = 5): Promise<any[]> {
    let qQuery = db.select({
      id: question.id,
      question: question.question,
      difficulty: question.difficulty,
      xp: question.xp,
      image_urls: question.image_urls
    }).from(question);

    if (subtopicId) {
        qQuery = qQuery.where(eq(question.subtopic_id, subtopicId));
    } else if (topicId) {
        const subtopics = await db.select({ id: subtopic.id }).from(subtopic).where(eq(subtopic.topic_id, topicId));
        const subtopicIds = subtopics.map(s => s.id);
        if (subtopicIds.length > 0) {
            qQuery = qQuery.where(inArray(question.subtopic_id, subtopicIds));
        } else {
            return []; // No subtopics found
        }
    }
    
    // Postgres specific random order
    const randomQuestions = await qQuery.orderBy(sql`RANDOM()`).limit(limit);

    if (randomQuestions.length === 0) return [];

    const qIds = randomQuestions.map(q => q.id);
    const options = await db.select().from(option).where(inArray(option.question_id, qIds));

    // Assemble questions with their options
    return randomQuestions.map(q => {
        const qOptions = options.filter(o => o.question_id === q.id);
        return {
            ...q,
            options: qOptions.map(o => ({
                id: o.id,
                answer: o.answer,
                is_correct: o.is_correct,
                image_url: o.image_url
            }))
        };
    });
}
