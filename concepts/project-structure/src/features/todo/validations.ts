import { z } from "zod";

export const addTodoValidation = z.object({
  title: z.string().min(1, "Title is required"),
});
