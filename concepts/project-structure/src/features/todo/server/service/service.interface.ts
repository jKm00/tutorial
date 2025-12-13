import { Todo } from "../../types";

export interface ITodoService {
  getTodos(): Promise<Todo[]>;
  addTodo(title: string): Promise<{ id: string }>;
}
