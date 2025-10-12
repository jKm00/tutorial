import { useQuery } from "@tanstack/react-query";
import { todoController } from "../server/todo.controller";

export const todoQueryKeys = {
  get: ["todos"] as const,
};

function useGetTodos() {
  return useQuery({
    queryKey: todoQueryKeys.get,
    queryFn: async () => {
      return await todoController.getTodos();
    },
  });
}

export const todoQueries = {
  useGetTodos,
};
