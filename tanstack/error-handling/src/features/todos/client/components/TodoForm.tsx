import { todoMutations } from "../todo.mutations";

export default function TodoForm() {
  const mutation = todoMutations.useAddTodo();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const todo = (formData.get("todo") ?? "") as string;

    mutation.mutate(todo, {
      onSuccess: (result) => {
        if (!result.ok) {
          switch (result.error.type) {
            case "TooShortError":
              alert("Todo is too short");
              break;
            case "DuplicateError":
              alert("Todo already exists");
              break;
            case "UnknownError":
              alert("Unknown error");
              break;
            default:
              alert("Unknown error");
              break;
          }
        }
      },
      onError: () => {
        alert("Unknown error");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Enter todo..." name="todo" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
