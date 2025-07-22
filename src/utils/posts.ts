import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    },
    {
      id: 2,
      title: "qui est esse",
    },
    {
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    },
    {
      id: 4,
      title: "eum et est occaecati",
    },
    {
      id: 5,
      title: "dolorem eum magni esse",
    },
  ];
});

export function postsQueryOptions(example: string) {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
      console.log(`Loading posts for ${example}`);
      const posts = await getPosts();
      return { posts };
    },
  });
}
