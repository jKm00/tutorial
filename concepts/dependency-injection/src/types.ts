import type { InferSelectModel } from "drizzle-orm";
import type { recipes } from "./lib/db/schema.js";

export type Recipe = InferSelectModel<typeof recipes>;

export type NewRecipe = Omit<Recipe, "id">;
