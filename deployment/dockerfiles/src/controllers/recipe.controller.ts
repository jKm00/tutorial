import { Hono } from "hono";
import { validator } from "hono/validator";
import z from "zod";
import { recipeService } from "../services/recipe.service.js";
import { tryCatch } from "../utils.js";
import { NotFoundError } from "../errors/index.js";
import { recipeValidators } from "../validators.js";
import { recipeMappers } from "../mappers/recipe.mappers.js";

const recipe = new Hono();

recipe.get("/", (c) => {
  const recipes = recipeService.getRecipes();

  c.status(200);
  return c.json({ recipes });
});

// Need to register /random before /:id to avoid route conflict
recipe.get("/random", (c) => {
  const recipe = recipeService.getRandomRecipe();

  c.status(200);
  return c.json(recipe);
});

recipe.get("/:id", async (c) => {
  const { id } = c.req.param();

  const [error, recipe] = await tryCatch(recipeService.getRecipe(id));

  if (error)
    if (error instanceof NotFoundError) {
      c.status(404);
      return c.json(error.toJSON());
    } else {
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }

  c.status(200);
  return c.json(recipe);
});

recipe.post(
  "/",
  validator("json", (value, c) => {
    const parsed = recipeValidators.addRecipeSchema.safeParse(value);
    if (!parsed.success) {
      const errors = z.treeifyError(parsed.error);
      return c.json({ message: "Invalid request", errors }, 400);
    }
    return parsed.data;
  }),
  (c) => {
    const recipe = c.req.valid("json");

    const mapped = recipeMappers.mapAddRecipeRequestToDomain(recipe);
    const id = recipeService.addRecipe(mapped);

    c.status(201);
    return c.json({ id });
  },
);

recipe.put(
  "/:id",
  validator("json", (value, c) => {
    const parsed = recipeValidators.updateRecipeSchema.safeParse(value);
    if (!parsed.success) {
      const error = z.treeifyError(parsed.error);
      return c.json({ message: "Invalid request", errors: error }, 400);
    }
    return parsed.data;
  }),
  async (c) => {
    const { id } = c.req.param();
    const updated = c.req.valid("json");

    const mapped = recipeMappers.mapUpdateRecipeRequestToDomain(updated);
    const [error] = await tryCatch(recipeService.updateRecipe(id, mapped));

    if (error) {
      if (error instanceof NotFoundError) {
        c.status(404);
        return c.json(error.toJSON());
      } else {
        c.status(500);
        return c.json({ message: "Internal Server Error" });
      }
    }

    c.status(200);
    return c.json({ message: "Recipe updated" });
  },
);

recipe.delete("/:id", async (c) => {
  const { id } = c.req.param();

  const [error] = await tryCatch(recipeService.deleteRecipe(id));

  if (error) {
    if (error instanceof NotFoundError) {
      c.status(404);
      return c.json(error.toJSON());
    } else {
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  }

  c.status(200);
  return c.json({ message: "Recipe deleted" });
});

export const recipeController = recipe;