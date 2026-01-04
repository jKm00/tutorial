import { expect, test } from "vitest";
import { RecipesService } from "../src/services/recipes.service.js";
import { RecipesRepoMock } from "../src/repos/recipes.repo.mock.js";

test("Returns all recipes", async () => {
  const mockRepo = new RecipesRepoMock();
  const recipesService = new RecipesService(mockRepo);
  const recipes = await recipesService.getRecipes();
  expect(recipes.length).toBe(1);
});
