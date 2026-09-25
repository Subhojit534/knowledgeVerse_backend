import { boolean, integer, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { shop } from "./shop.js";

export const user_inventory = pgTable("user_inventory", {
    id: uuid().defaultRandom().primaryKey(),
    user_id: uuid().references(() => user.id).notNull(),
    item_id: uuid().references(() => shop.id).notNull(),
    quantity: integer().default(1).notNull(),
    is_equipped: boolean().default(false).notNull(),
    acquired_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
});
