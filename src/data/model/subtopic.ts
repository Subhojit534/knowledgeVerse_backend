import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { topic } from "./topic.js";
import { difficulty } from "./user.js";



export const subtopic = pgTable("subtopic", {
    id: uuid().notNull().defaultRandom().primaryKey(),
    topic_id: uuid().notNull().references(() => topic.id),
    image_urls: text().array(),
    name: text().notNull(),
    description: text(),
    difficulty: difficulty().default("Easy").notNull(),
})

