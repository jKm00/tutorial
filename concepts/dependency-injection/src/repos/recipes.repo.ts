import { db } from "../lib/db/index.js";
import { recipes } from "../lib/db/schema.js";
import type { NewRecipe, Recipe } from "../types.js";
import type { IRecipeRepo } from "./recipes.repo.interface.js";
import { eq } from "drizzle-orm";

async function getAll() {
  return await db.select().from(recipes);
}

async function getById(id: string) {
  const res = await db.select().from(recipes).where(eq(recipes.id, id));
  if (res.length === 0) return undefined;
  return res[0];
}

async function save(recipe: NewRecipe) {
  const res = await db.insert(recipes).values(recipe).returning();
  return res[0];
}

export const recipesRepo = {
  getAll,
  getById,
  save,
};
