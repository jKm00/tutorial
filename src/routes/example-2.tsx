import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { postsQueryOptions } from "~/utils/posts";

export const Route = createFileRoute("/example-2")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery(postsQueryOptions("example-2"));

  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>Error loading posts: {query.error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Example 2</h1>
      <h2 className="text-lg font-semibold mb-2">Posts</h2>
      <div className="space-y-2">
        {query.data.posts.map((post) => (
          <article key={post.id} className="border p-2 rounded-md w-fit">
            <h3>{post.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
