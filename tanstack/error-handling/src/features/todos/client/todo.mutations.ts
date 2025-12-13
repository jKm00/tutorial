import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoController } from "../server/todo.controller";
import { todoQueryKeys } from "./todo.queries";

function useAddTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      return await todoController.addTodo({ data: { text } });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: todoQueryKeys.get });
    },
  });
}

export const todoMutations = {
  useAddTodo,
};
