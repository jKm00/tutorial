import { createServerFn } from "@tanstack/react-start";
import { Todo } from "./types";

const todos: Todo[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    completed: false,
  },
  {
    id: "2",
    title: "Build a React app",
    completed: true,
  },
  {
    id: "3",
    title: "Write tests",
    completed: false,
  },
];

export const getTodos = createServerFn({ method: "GET" }).handler(async () => {
  return todos;
});

export const addTodo = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "string") {
      throw new Error("Invalid todo data");
    }
    if (data.trim() === "") {
      throw new Error("Todo cannot be empty");
    }
    return data;
  })
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const todo: Todo = {
      id: String(Date.now()),
      title: data,
      completed: false,
    };
    todos.push(todo);
    return todo;
  });
