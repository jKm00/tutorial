import { expect, test } from "vitest";
import { recipesService } from "../src/services/recipes.service.js";

test("Returns all recipes", async () => {
  const recipes = await recipesService.getRecipes();
  expect(recipes.length).toBe(1);
});
