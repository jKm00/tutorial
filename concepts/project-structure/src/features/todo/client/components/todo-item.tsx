import { Todo } from "../../types";

export default function TodoItem({ todo }: { todo: Todo }) {
  return <div>{todo.title}</div>;
}
