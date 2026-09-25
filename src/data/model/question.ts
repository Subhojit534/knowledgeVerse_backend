import { subtopic } from './subtopic.js';
import { index, integer, pgEnum, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { subject } from "./subject.js";
import { difficulty } from "./user.js";
export const question_type = pgEnum("question_type", ["MCQ", "SAQ"])

export const question = pgTable("question", {
    id: uuid().defaultRandom().primaryKey(),
    question: text().notNull(),
    subtopic_id: uuid().references(() => subtopic.id),
    image_urls: text().array(),
    xp: integer().default(50).notNull(),
    difficulty: difficulty().default("Easy").notNull(),
    question_type: question_type().notNull().default("MCQ"),
}, (table) => [
    index("question_subtopic_id").on(table.subtopic_id),
])