import { createServerFn } from "@tanstack/react-start";
import { AddTodoResponse } from "./dtos";
import { todoService } from "./service";
import { mapErrorToApiResponse, CustomError } from "~/errors";

const addTodo = createServerFn()
  .inputValidator((data: { text: string }) => data)
  .handler(({ data }): AddTodoResponse => {
    if (!data.text || data.text.length === 0) {
      return {
        ok: false,
        error: { message: "Text is required", type: "TooShortError" },
      };
    }

    try {
      todoService.addTodo({ text: data.text });
      return { ok: true, data: `Todo (${data.text}) added successfully` };
    } catch (err) {
      if (err instanceof CustomError) {
        return mapErrorToApiResponse(err);
      }
      return {
        ok: false,
        error: { message: "Unknown error", type: "UnknownError" },
      };
    }
  });

export const todoController = {
  addTodo,
};
