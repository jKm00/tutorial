import { expect, test } from "vitest";
import { TodoRepoMock } from "../repo/repo.mock";
import { TodoService } from "./service";

test("Should create new todo", () => {
  const mock = new TodoRepoMock();
  const todoService = TodoService.getInstance(mock);

  const res = todoService.addTodo("New Todo");
  expect(res).resolves.toEqual({ id: "2" });
});
