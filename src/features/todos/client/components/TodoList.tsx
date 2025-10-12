import { todoQueries } from "../todo.queries";

export default function TodoList() {
  const { data: result, isPending, error } = todoQueries.useGetTodos();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!result?.ok) {
    return <div>Error: {result?.error.message}</div>;
  }

  if (result.data.length === 0) {
    return <div>No todos found</div>;
  }

  return (
    <ul>
      {result.data.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}
