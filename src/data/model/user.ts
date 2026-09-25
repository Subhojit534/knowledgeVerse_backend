import { pgTable, uuid, text, pgEnum, integer, date } from "drizzle-orm/pg-core";
import { classTable } from "./class.js";

export const authProvider = pgEnum("auth_provider", ["Google", "Manual"])
export const difficulty = pgEnum("difficulty", ["Easy", "Medium", "Hard"])


export const user = pgTable("user", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    username: text().notNull().unique(),
    class_id: uuid().references(() => classTable.id, { onDelete: "set null" }),
    avatar_id: text().notNull().default("1"),
    password: text(),
    provider: authProvider("provider").notNull().default("Manual"),
    difficulty: difficulty().notNull().default("Medium"),
    xp: integer("xp").notNull().default(0),
    level: integer("level").notNull().default(1),
    coins: integer("coins").notNull().default(500),
    gems: integer().notNull().default(25),
    energy: integer().notNull().default(100),
    streak_days: integer().notNull().default(1),
    last_loggedin: date().notNull().defaultNow(),
    created_at: date().notNull().defaultNow(),
    updated_at: date().notNull().defaultNow(),
})