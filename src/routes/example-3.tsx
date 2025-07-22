import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { postsQueryOptions } from "~/utils/posts";

export const Route = createFileRoute("/example-3")({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(postsQueryOptions("example-3"));
  },
});

function RouteComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const query = useSuspenseQuery(postsQueryOptions("example-3"));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Example 3</h1>
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
