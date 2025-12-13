import { useQuery } from "@tanstack/react-query";
import { todoController } from "../server/controller";

const todoQueryKeys = {
  all: ["todos"],
} as const;

export function useGetTodos() {
  return useQuery({
    queryKey: todoQueryKeys.all,
    queryFn: async () => todoController.getTodos(),
  });
}
