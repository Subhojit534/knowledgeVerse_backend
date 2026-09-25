import { integer, pgTable, uniqueIndex, uuid, index } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { subject } from "./subject.js";

export const island = pgTable("island", {
    id: uuid().defaultRandom().primaryKey(),
    user_id: uuid().notNull().references(() => user.id),
    subject_id: uuid().notNull().references(() => subject.id),
    level: integer().default(1).notNull(),
}, (table) => [
    uniqueIndex("island_user_id_subject_id_uq").on(table.user_id, table.subject_id),
    index("island_user_id_idx").on(table.user_id),
])