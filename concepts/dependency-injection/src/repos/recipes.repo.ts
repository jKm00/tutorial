import { db } from "../lib/db/index.js";
import { recipes } from "../lib/db/schema.js";
import { eq } from "drizzle-orm";
import type { NewRecipe } from "../types.js";
import type { IRecipesRepo } from "./recipes.repo.interface.js";

export class RecipesRepo implements IRecipesRepo {
  async getAll() {
    return await db.select().from(recipes);
  }

  async getById(id: string) {
    const res = await db.select().from(recipes).where(eq(recipes.id, id));
    if (res.length === 0) return undefined;
    return res[0];
  }

  async save(recipe: NewRecipe) {
    const res = await db.insert(recipes).values(recipe).returning();
    return res[0];
  }
}
