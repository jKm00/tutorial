import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { healthController } from "./controllers/health.controller.js";
import { recipeController } from "./controllers/recipe.controller.js";

const api = new Hono().basePath("/api");

const v1 = new Hono();
v1.route("/v1/health", healthController);
v1.route("/v1/recipes", recipeController);

api.route("/", v1);

if (process.env.NODE_ENV === "development") {
  api.use(logger());
}

serve(
  {
    fetch: api.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);