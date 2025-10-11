import { createFileRoute } from "@tanstack/react-router";
import { todoController } from "~/features/todos/controller";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  async function onClick() {
    const result = await todoController.addTodo({ data: { text: "Hello" } });
    if (!result.ok) {
      switch (result.error.type) {
        case "TooShortError":
          alert("Todo is too short");
          break;
        case "DuplicateError":
          alert("Todo already exists");
          break;
        default:
          alert("Unknown error");
      }
      return;
    }

    alert(result.data);
  }

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <button onClick={onClick}>Roll Dice</button>
    </div>
  );
}
