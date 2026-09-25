import { boolean, index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { question } from "./question.js";

export const option = pgTable("option", {
    id: uuid().notNull().defaultRandom().primaryKey(),
    question_id: uuid().references(() => question.id),
    answer: text().notNull(),
    image_url: text(),
    is_correct: boolean().notNull().default(false),
}, (table) => [
    uniqueIndex("option_question_id_answer").on(table.question_id, table.answer),
    index("option_question_id_idx").on(table.question_id),
])