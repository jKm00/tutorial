import type { Ingredient } from "./ingredient.js";

export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
};