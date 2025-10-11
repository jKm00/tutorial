import { DuplicateTodoError } from "./errors";
import { Todo } from "./types";

const todos: Todo[] = [];

function addTodo(todo: Todo) {
  if (todos.find((t) => t.text === todo.text)) {
    throw new DuplicateTodoError("Todo already exists");
  }

  todos.push(todo);
}

export const todoService = {
  addTodo,
};
