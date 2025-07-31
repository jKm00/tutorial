import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <ThemeToggle />
    </div>
  );
}
