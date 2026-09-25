import { date, pgEnum, pgTable, uuid, uniqueIndex, check, index } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { eq, sql } from "drizzle-orm";

export const friendship_status = pgEnum("friendship_status", ["PENDING", "ACCEPTED", "BLOCKED", "IGNORED"])


export const friendship = pgTable("friendship", {
    id: uuid().notNull().defaultRandom().primaryKey(),
    requester_id: uuid().notNull().references(() => user.id),
    addressee_id: uuid().notNull().references(() => user.id),
    created_at: date().notNull().defaultNow(),
    updated_at: date().notNull().defaultNow(),
    status: friendship_status().notNull().default("PENDING"),

}, (table) => [
    uniqueIndex("friendship_requester_addresse_uq").on(table.requester_id, table.addressee_id),
    check("no_self_friendship", sql`${table.requester_id} <> ${table.addressee_id}`),
    index("accepted_friend_index").on(table.requester_id, table.addressee_id, table.status)
])