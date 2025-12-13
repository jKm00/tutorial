import { NotFoundError } from "../errors/index.js";
import type { Recipe } from "../models/recipe.js";
import { recipes } from "./mock.data.js";

function getRecipes() {
  return recipes;
}

async function getRecipe(id: string) {
  const found = recipes.find((recipe) => recipe.id === id);

  if (!found) throw new NotFoundError("Recipe not found");

  return found;
}

function getRandomRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

function addRecipe(recipe: Omit<Recipe, "id">) {
  const fullRecipe = {
    id: crypto.randomUUID(),
    ...recipe,
  };
  recipes.push(fullRecipe);
  return fullRecipe.id;
}

async function updateRecipe(id: string, updatedRecipe: Partial<Recipe>) {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex === -1) throw new NotFoundError("Recipe not found");

  recipes[recipeIndex] = {
    id,
    name: updatedRecipe.name ?? recipes[recipeIndex]!.name,
    description: updatedRecipe.description ?? recipes[recipeIndex]!.description,
    ingredients: updatedRecipe.ingredients ?? recipes[recipeIndex]!.ingredients,
    instructions:
      updatedRecipe.instructions ?? recipes[recipeIndex]!.instructions,
  };
}

async function deleteRecipe(id: string) {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex === -1) throw new NotFoundError("Recipe not found");

  recipes.splice(recipeIndex, 1);
}

export const recipeService = {
  getRecipes,
  getRecipe,
  getRandomRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};