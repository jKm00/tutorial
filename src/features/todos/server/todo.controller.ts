import { createServerFn } from "@tanstack/react-start";
import { AddTodoResponse, GetTodosResponse } from "../todo.dtos";
import { todoService } from "./todo.service";
import { mapErrorToApiResponse, CustomError } from "~/errors";
import { tryCatch } from "~/utils/helpers";

const getTodos = createServerFn().handler(
  async (): Promise<GetTodosResponse> => {
    const [error, todos] = await tryCatch(todoService.getTodos());

    if (error) {
      if (error instanceof CustomError) {
        return mapErrorToApiResponse(error);
      }
      return {
        ok: false,
        error: { message: "Unknown error", type: "UnknownError" },
      };
    }

    return { ok: true, data: todos };
  },
);

const addTodo = createServerFn()
  .inputValidator((data: { text: string }) => data)
  .handler(async ({ data }): Promise<AddTodoResponse> => {
    if (!data.text || data.text.length === 0) {
      return {
        ok: false,
        error: { message: "Text is required", type: "TooShortError" },
      };
    }

    const [error] = await tryCatch(todoService.addTodo({ text: data.text }));

    if (error) {
      if (error instanceof CustomError) {
        return mapErrorToApiResponse(error);
      }
      return {
        ok: false,
        error: { message: "Unknown error", type: "UnknownError" },
      };
    }

    return {
      ok: true,
      data: { message: `Todo (${data.text}) added successfully` },
    };
  });

export const todoController = {
  getTodos,
  addTodo,
};
