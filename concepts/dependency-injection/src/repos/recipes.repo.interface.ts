import type { NewRecipe, Recipe } from "../types.js";

export interface IRecipesRepo {
  getAll(): Promise<Recipe[]>;
  getById(id: string): Promise<Recipe | undefined>;
  save(recipe: NewRecipe): Promise<Recipe>;
}
