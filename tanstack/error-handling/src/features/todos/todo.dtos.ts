import { ServerResponse } from "~/types";
import { AddTodoErrorType, GetTodosErrorType } from "./todo.errors";
import { Todo } from "./todo.types";

export type GetTodosResponse = ServerResponse<Todo[], GetTodosErrorType>;

export type AddTodoResponse = ServerResponse<
  { message: string },
  AddTodoErrorType
>;
