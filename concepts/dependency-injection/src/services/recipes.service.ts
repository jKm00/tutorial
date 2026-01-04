import { recipesRepo } from "../repos/recipes.repo.js";
import type { NewRecipe, Recipe } from "../types.js";

async function getRecipes() {
  return await recipesRepo.getAll();
}

async function getRecipe(id: string) {
  const recipe = await recipesRepo.getById(id);

  if (!recipe) {
    throw new Error(`Recipe with id ${id} not found`);
  }

  return recipe;
}

async function saveRecipe(recipe: NewRecipe) {
  return await recipesRepo.save(recipe);
}

export const recipesService = {
  getRecipes,
  getRecipe,
  saveRecipe,
};
