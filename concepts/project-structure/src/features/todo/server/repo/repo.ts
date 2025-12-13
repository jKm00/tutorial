import { db } from "@/lib/db";
import { todo } from "../../schema";
import { ITodoRepo } from "./repo.interface";

export class TodoRepo implements ITodoRepo {
  private static instance: TodoRepo;

  private constructor() {}

  public static getInstance(): TodoRepo {
    if (!TodoRepo.instance) {
      TodoRepo.instance = new TodoRepo();
    }
    return TodoRepo.instance;
  }

  async findTodos() {
    const result = await db.query.todo.findMany();
    return result;
  }

  async saveTodo(title: string) {
    const res = await db
      .insert(todo)
      .values({
        title,
      })
      .returning({ id: todo.id });
    return res[0];
  }
}
