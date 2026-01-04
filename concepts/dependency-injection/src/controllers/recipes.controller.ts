import { Hono } from "hono";
import { recipesService } from "../services/recipes.service.js";
import type { NewRecipe } from "../types.js";

export const recipesController = new Hono();

recipesController
  .get("/recipes", (c) => {
    const recipes = recipesService.getRecipes();
    return c.json({ recipes });
  })
  .get("/recipes/:id", (c) => {
    const id = c.req.param("id");
    try {
      const recipe = recipesService.getRecipe(id);
      return c.json({ recipe });
    } catch (error) {
      return c.json({ error });
    }
  })
  .post("/recipes", (c) => {
    const body = c.req.json() as unknown as NewRecipe;
    const newRecipe = recipesService.saveRecipe(body);
    return c.json({ recipe: newRecipe });
  });
