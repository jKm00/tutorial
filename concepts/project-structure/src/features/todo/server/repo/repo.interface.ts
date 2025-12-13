import { Todo } from "../../types";

export interface ITodoRepo {
  findTodos(): Promise<Todo[]>;
  saveTodo(title: string): Promise<{ id: string }>;
}
