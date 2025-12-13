import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { postsQueryOptions } from "~/utils/posts";

export const Route = createFileRoute("/with-suspense-query")({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(postsQueryOptions());
  },
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Inner />
      </Suspense>
    </div>
  );
}

function Inner() {
  const { data } = useSuspenseQuery(postsQueryOptions());

  return (
    <div className="space-y-2">
      {data.posts.map((post) => (
        <article key={post.id} className="border p-2 rounded-md w-fit">
          <h3>{post.title}</h3>
        </article>
      ))}
    </div>
  );
}
