import { index, integer, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { topic } from "./topic.js";

export const building = pgTable("building", {
    id: uuid().defaultRandom().primaryKey(),
    user_id: uuid().notNull().references(() => user.id),
    topic_id: uuid().notNull().references(() => topic.id),
    level: integer().notNull().default(1),
    answered_questions: integer().notNull().default(0),
}, (table) => [
    uniqueIndex("building_user_id_topic_id_uq").on(table.user_id, table.topic_id),
    index("building_user_id_idx").on(table.user_id),
])