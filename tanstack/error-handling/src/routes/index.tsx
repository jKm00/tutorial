import { createFileRoute } from "@tanstack/react-router";
import TodoForm from "~/features/todos/client/components/TodoForm";
import TodoList from "~/features/todos/client/components/TodoList";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <TodoForm />
      <TodoList />
    </div>
  );
}
