import { DuplicateTodoError } from "../todo.errors";
import { Todo } from "../todo.types";

const todos: Todo[] = [];

async function getTodos() {
  return todos;
}

async function addTodo(todo: Todo) {
  if (todos.find((t) => t.text === todo.text)) {
    throw new DuplicateTodoError("Todo already exists");
  }

  todos.push(todo);
}

export const todoService = {
  getTodos,
  addTodo,
};
