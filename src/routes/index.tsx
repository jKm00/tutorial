import TodoForm from "@/features/todo/client/components/todo-form";
import TodoList from "@/features/todo/client/components/todo-list";
import { createFileRoute } from "@tanstack/react-router";
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
