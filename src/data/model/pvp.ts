import { boolean, integer, pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { building } from "./building.js";

export const pvp_stats = pgTable("pvp_stats", {
    id: uuid().defaultRandom().primaryKey(),
    user_id: uuid().references(() => user.id).notNull().unique(),
    rating: integer().default(1000).notNull(),
    tier: text().default('Bronze').notNull(),
    wins: integer().default(0).notNull(),
    losses: integer().default(0).notNull(),
    draws: integer().default(0).notNull(),
});

export const duel = pgTable("duel", {
    id: uuid().defaultRandom().primaryKey(),
    challenger_id: uuid().references(() => user.id).notNull(),
    target_id: uuid().references(() => user.id), // Nullable if AI
    subject: text().notNull(),
    status: text().default('pending').notNull(), // pending, active, completed, cancelled
    challenger_score: integer().default(0).notNull(),
    target_score: integer().default(0).notNull(),
    questions: jsonb().default([]).notNull(),
    created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
});
