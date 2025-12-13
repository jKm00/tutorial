import type { Recipe } from "../models/recipe.js";
import type { AddRecipeRequest, UpdateRecipeRequest } from "../validators.js";

function mapAddRecipeRequestToDomain(
  request: AddRecipeRequest,
): Omit<Recipe, "id"> {
  return {
    name: request.name,
    description: request.description || "",
    ingredients: request.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
    instructions: request.instructions,
  };
}

function mapUpdateRecipeRequestToDomain(
  request: UpdateRecipeRequest,
): Partial<Omit<Recipe, "id">> {
  return {
    name: request.name,
    description: request.description,
    ingredients: request.ingredients?.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
    instructions: request.instructions,
  };
}

export const recipeMappers = {
  mapAddRecipeRequestToDomain,
  mapUpdateRecipeRequestToDomain,
};