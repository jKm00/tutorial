import { createServerFn } from "@tanstack/react-start";
import { addTodoValidation } from "../validations";
import { withAuth } from "@/features/auth/server/middleware";
import { todoServiceFactory } from "./service/service.factory";

const todoService = todoServiceFactory.getService();

const getTodos = createServerFn().handler(async () => {
  return await todoService.getTodos();
});

const addTodo = createServerFn()
  .validator(addTodoValidation)
  .middleware([withAuth])
  .handler(async ({ data }) => {
    return await todoService.addTodo(data.title);
  });

export const todoController = {
  getTodos,
  addTodo,
};
