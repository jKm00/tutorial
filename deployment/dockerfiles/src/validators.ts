import z from "zod";

const addRecipeSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.number().positive("Quantity must be positive"),
        unit: z.string().min(1, "Unit is required"),
      }),
    )
    .min(1, "At least one ingredient is required"),
  instructions: z
    .array(z.string().min(1, "Instruction cannot be empty"))
    .min(1, "At least one instruction is required"),
});
export type AddRecipeRequest = z.infer<typeof addRecipeSchema>;

const updateRecipeSchema = z.object({
  name: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.number().positive("Quantity must be positive"),
        unit: z.string().min(1, "Unit is required"),
      }),
    )
    .min(1, "At least one ingredient is required")
    .optional(),
  instructions: z
    .array(z.string().min(1, "Instruction cannot be empty"))
    .min(1, "At least one instruction is required")
    .optional(),
});
export type UpdateRecipeRequest = z.infer<typeof updateRecipeSchema>;

export const recipeValidators = {
  addRecipeSchema,
  updateRecipeSchema,
};