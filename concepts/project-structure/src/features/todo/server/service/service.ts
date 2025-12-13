import { ITodoRepo } from "../repo/repo.interface";
import { ITodoService } from "./service.interface";

export class TodoService implements ITodoService {
  private static instance: TodoService;
  private repo: ITodoRepo;

  private constructor(repo: ITodoRepo) {
    this.repo = repo;
  }

  public static getInstance(repo: ITodoRepo): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService(repo);
    }
    return TodoService.instance;
  }

  async getTodos() {
    return this.repo.findTodos();
  }

  async addTodo(title: string) {
    // ... Checks
    return this.repo.saveTodo(title);
  }
}
