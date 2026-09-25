import { pgTable, text, uuid, uniqueIndex } from "drizzle-orm/pg-core";
import { subject } from "./subject.js";
import { difficulty } from "./user.js";

export const topic = pgTable("topic", {
    id: uuid().defaultRandom().notNull().primaryKey(),
    subject_id: uuid().references(() => subject.id),
    image_url: text(),
    name: text().notNull(),
    description: text(),
    difficulty: difficulty().default("Medium"),
}, (table) => [
    uniqueIndex("subject_id_name_unique").on(table.subject_id, table.name)
])

