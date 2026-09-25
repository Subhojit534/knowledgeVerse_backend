import { pgTable, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";
import { classTable } from "./class.js";


export const subject = pgTable("subject", {
    id: uuid().notNull().defaultRandom().primaryKey(),
    class_id: uuid().notNull().references(() => classTable.id),
    image_url: text(),
    name: text().notNull(),
    description: text(),
}, (table) => [
    uniqueIndex("subject_name_class_id_uq").on(table.name, table.class_id)
])