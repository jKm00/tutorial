import type { IRecipesRepo } from "../repos/recipes.repo.interface.js";
import type { NewRecipe } from "../types.js";

export class RecipesService {
  private repo: IRecipesRepo;

  constructor(repo: IRecipesRepo) {
    this.repo = repo;
  }

  async getRecipes() {
    return await this.repo.getAll();
  }

  async getRecipe(id: string) {
    const recipe = await this.repo.getById(id);

    if (!recipe) {
      throw new Error(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  async saveRecipe(recipe: NewRecipe) {
    return await this.repo.save(recipe);
  }
}
