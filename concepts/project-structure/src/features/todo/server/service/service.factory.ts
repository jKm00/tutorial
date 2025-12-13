import { TodoRepo } from "../repo/repo";
import { ITodoRepo } from "../repo/repo.interface";
import { TodoRepoMock } from "../repo/repo.mock";
import { TodoService } from "./service";

function getService() {
  const enableMock = process.env.ENABLE_MOCK === "true";
  let repo: ITodoRepo;
  if (enableMock) {
    repo = new TodoRepoMock();
  } else {
    repo = TodoRepo.getInstance();
  }
  return TodoService.getInstance(repo);
}

export const todoServiceFactory = {
  getService,
};
