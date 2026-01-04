import { Hono } from "hono";
import type { NewRecipe } from "../types.js";
import { RecipesService } from "../services/recipes.service.js";
import { RecipesRepo } from "../repos/recipes.repo.js";

export const recipesController = new Hono();

const repo = new RecipesRepo();
const recipesService = new RecipesService(repo);

recipesController
  .get("/recipes", (c) => {
    const recipes = recipesService.getRecipes();
    return c.json({ recipes });
  })
  .get("/recipes/:id", (c) => {
    const id = c.req.param("id");
    try {
      const recipe = recipesService.getRecipe(id);
      return c.json({ recipe }, 200);
    } catch (error) {
      return c.json({ error }, 500);
    }
  })
  .post("/recipes", (c) => {
    const body = c.req.json() as unknown as NewRecipe;
    const newRecipe = recipesService.saveRecipe(body);
    return c.json({ recipe: newRecipe });
  });
