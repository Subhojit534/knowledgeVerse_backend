import { date, integer, pgTable, text, uuid, index } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const guild = pgTable("guild", {
    id: uuid().defaultRandom().primaryKey(),
    leader_id: uuid().notNull().references(() => user.id),
    name: text().notNull(),
    tag: text().notNull().unique(),
    motto: text(),
    level: integer().notNull(),
    member_count: integer().notNull().default(1),
    created_at: date().notNull().defaultNow(),
    updated_at: date().notNull().defaultNow(),
}, (table) => [
    index("guild_level_idx").on(table.level.desc())
])