import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/another-page")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/another-page"!</div>;
}
