import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, getTodos } from "./server";
import { useServerFn } from "@tanstack/react-start";

export function todosQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: async () => {
      const todos = await getTodos();
      return todos;
    },
  });
}

export function useAddTodoMutation() {
  const queryClient = useQueryClient();
  const _addTodo = useServerFn(addTodo);

  return useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (newTodo: string) => {
      return await _addTodo({ data: newTodo });
    },
    onSuccess: (todo) => {
      queryClient.setQueryData(todosQueryOptions().queryKey, (oldData) => {
        if (!oldData) return [todo];
        return [...oldData, todo];
      });
    },
  });
}
