import { pgEnum, pgTable, text, uuid, index, uniqueIndex } from "drizzle-orm/pg-core";

export const boardEnum = pgEnum("board", ["ICSE", "CBSE", "BSEB", "WBBSE", "DBSE", "CAIE"]);

export const classTable = pgTable("class", {
    id: uuid("id").notNull().defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text(),
    board: boardEnum("board").notNull(),
}, (table) => [
    uniqueIndex("class_name_board_uq").on(table.name, table.board)
])



