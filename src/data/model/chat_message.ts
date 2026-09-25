import { pgTable, text, uuid, pgEnum, index, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { eq, or } from "drizzle-orm";

export const message_status = pgEnum("message_status", ["SENT", "READ"])

export const chat_messages = pgTable("chat_message", {
    from: uuid().notNull().references(() => user.id),
    to: uuid().notNull().references(() => user.id),
    content: text().notNull(),
    status: message_status().notNull().default("SENT"),
    sent_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow(),
}, (table) => [
    index("chat_message_from_to_sent_at_idx").on(table.from, table.to, table.sent_at.desc())
])

