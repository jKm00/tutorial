import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "~/utils/posts";

export const Route = createFileRoute("/basic-loader")({
  component: RouteComponent,
  loader: async () => {
    const posts = await getPosts();
    return { posts };
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 1000,
  pendingMinMs: 500,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Post</h1>
      <div className="space-y-2">
        {data.posts.map((post) => (
          <article key={post.id} className="border p-2 rounded-md w-fit">
            <h3>{post.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
