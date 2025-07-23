import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

type Post = {
  id: number;
  title: string;
  body: string;
};

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .then((d) => d.slice(0, 10) as Post[]);
});

export function postsQueryOptions() {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      return { posts };
    },
  });
}
