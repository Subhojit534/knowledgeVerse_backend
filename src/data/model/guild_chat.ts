import { pgTable, text, uuid, index, timestamp } from "drizzle-orm/pg-core";
import { guild } from "./guild.js";
import { user } from "./user.js";

export const guild_chat = pgTable("guild_chat", {
    id: uuid().defaultRandom().primaryKey().notNull(),
    guild_id: uuid().notNull().references(() => guild.id, { onDelete: "cascade" }),
    from: uuid().notNull().references(() => user.id, { onDelete: "cascade" }),
    content: text().notNull(),
    sent_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow(),
}, (table) => [
    index("guild_chat_guild_id_sent_at_idx").on(table.guild_id, table.sent_at.desc()),
]);

export const guildChat = guild_chat;
