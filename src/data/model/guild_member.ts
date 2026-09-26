import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { guild } from "./guild.js";

export const guild_member = pgTable("guild_member", {
    guild_id: uuid().notNull().references(() => guild.id, { onDelete: "cascade" }),
    user_id: uuid().notNull().references(() => user.id, { onDelete: "cascade" }),
    joined_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow(),
}, (table) => [
    primaryKey({ columns: [table.guild_id, table.user_id] })
]);

export const guildMember = guild_member;
