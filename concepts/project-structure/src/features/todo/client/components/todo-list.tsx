import { useGetTodos } from "../actions";
import TodoItem from "./todo-item";

export default function TodoList() {
  const { data, isPending, error } = useGetTodos();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
