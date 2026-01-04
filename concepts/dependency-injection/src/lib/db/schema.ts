import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ingredients: text().notNull(),
  instructions: text().notNull(),
});
