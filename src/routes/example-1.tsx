import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "~/utils/posts";

export const Route = createFileRoute("/example-1")({
  component: RouteComponent,
  loader: async () => {
    console.log("Loading posts for example 1");
    const posts = await getPosts();
    return { posts };
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 0,
  pendingMinMs: 500,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Example 1</h1>
      <h2 className="text-lg font-semibold mb-2">Posts</h2>
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
