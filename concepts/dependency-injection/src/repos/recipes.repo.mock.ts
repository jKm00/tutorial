import type { NewRecipe, Recipe } from "../types.js";

export class RecipesRepoMock implements IRecipesRepo {
  private recipes: Recipe[] = [
    {
      id: crypto.randomUUID(),
      name: "Pancakes",
      description: "Juciy Pancakes",
      ingredients: "Eggs, Sugar, Milk",
      instructions:
        "Put all dry ingredients in a bow & stir, Add all liquide and stir, Heat up a pan, Add butter to pan, Poor batter into pan & fry for 2-4 minutes before flipping it, Continue til you run out of batter",
    },
  ];

  async getAll() {
    return this.recipes;
  }

  async getById(id: string) {
    return this.recipes.find((r) => r.id === id);
  }

  async save(recipe: NewRecipe) {
    const id = crypto.randomUUID();
    const newRecipe = {
      id,
      ...recipe,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
}
