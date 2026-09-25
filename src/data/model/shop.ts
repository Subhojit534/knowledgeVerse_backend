import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const shopCategory = pgEnum("shop_category", ["LEGENDARY", "EPIC", "COMMON", "UNCOMMON", "RARE"])
export const currency_type = pgEnum("currency_type", ["GEMS", "COINS"])


export const shop = pgTable("shop", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    category: text(),
    rarity: shopCategory().notNull().default("COMMON"),
    rarity_color: varchar({ length: 8 }).notNull().default("#418b32"),
    asset_url: text().notNull(),
    description: text(),
    perk_text: text(),
    price: integer().notNull().default(0),
    currency_type: currency_type().notNull().default("COINS"),
    tag_text: text(),
    slot_type: varchar({ length: 255 }),
    created_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow().$onUpdate(() => new Date()),
})

