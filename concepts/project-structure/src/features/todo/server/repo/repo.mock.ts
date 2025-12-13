import { ITodoRepo } from "./repo.interface";

export class TodoRepoMock implements ITodoRepo {
  async findTodos() {
    return [{ id: "1", title: "Mock Todo 1", createdAt: new Date(), updatedAt: new Date() }];
  }

  async saveTodo(title: string) {
    console.log("[Mock] adding todo...");
    return { id: "2" };
  }
}
