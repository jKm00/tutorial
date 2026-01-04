import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { NewRecipe } from "./types.js";
import { recipesService } from "./services/recipes.service.js";
import { recipesController } from "./controllers/recipes.controller.js";

const app = new Hono().basePath("/api");

app.route("/", recipesController);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
