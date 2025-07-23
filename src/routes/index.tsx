import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { todosQueryOptions, useAddTodoMutation } from "~/todos/actions";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(todosQueryOptions());
  },
});

function Home() {
  const query = useQuery(todosQueryOptions());
  const mutation = useAddTodoMutation();

  const form = useRef<HTMLFormElement>(null);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const todo = formData.get("todo") as string;

    if (!todo) return;

    mutation.mutate(todo, {
      onSuccess: () => {
        if (form.current) {
          form.current.reset();
        }
      },
    });
  }

  if (query.isPending) {
    return <div className="text-center">Loading todos...</div>;
  }

  if (query.error) {
    return (
      <p className="text-center text-red-500">{query.error.message || "Failed to load todos"}</p>
    );
  }

  return (
    <div className="p-4 py-24 mx-auto" style={{ width: "min(600px, 100%)" }}>
      <form onSubmit={handleFormSubmit} ref={form} className="flex gap-2 mb-8 w-full">
        <input
          type="text"
          name="todo"
          placeholder="Enter a new todo..."
          className="border rounded-md px-4 py-2 grow"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-800 rounded-md px-4 py-2"
        >
          {mutation.isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>
      <h3 className="text-2xl font-bold mb-2">Your Todos</h3>
      <ul>
        {query.data.map((todo) => (
          <TodoCard key={todo.id}>
            {todo.title}
            <span>{todo.completed ? " (Completed)" : " (Pending)"}</span>
          </TodoCard>
        ))}
        {mutation.isPending && (
          <div className="animate-pulse">
            <TodoCard>
              {mutation.variables} <span className="text-gray-500">(Adding...)</span>
            </TodoCard>
          </div>
        )}
        {mutation.isSuccess && query.isFetching && (
          <TodoCard>
            {mutation.variables} <span>(Added)</span>
          </TodoCard>
        )}
      </ul>
      {mutation.isError && (
        <p className="text-center text-red-500">
          Failed to add the todo.{" "}
          <button className="underline" onClick={() => form.current?.requestSubmit()}>
            Try again
          </button>
        </p>
      )}
    </div>
  );
}

function TodoCard({ children }: { children: React.ReactNode }) {
  return <li className="flex justify-between border rounded-md p-4 mb-4">{children}</li>;
}

// function TodoList() {
//   const { data } = useSuspenseQuery(todosQueryOptions());

//   const variables = useMutationState({
//     filters: { mutationKey: ["addTodo"], status: "pending" },
//     select: (mutation) => mutation.state.variables,
//   }) as string[];

//   return (
//     <ul>
//       {data.todos.map((todo) => (
//         <TodoCard key={todo.id}>
//           {todo.title}
//           <span>{todo.completed ? " (Completed)" : " (Pending)"}</span>
//         </TodoCard>
//       ))}
//       {variables.map((todo) => (
//         <div className="animate-pulse" key={todo}>
//           <TodoCard>
//             {todo} <span className="text-gray-500">(Adding...)</span>
//           </TodoCard>
//         </div>
//       ))}
//     </ul>
//   );
// }
