import axios from "redaxios";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  return axios.get<Product[]>("https://fakestoreapi.com/products?limit=10").then((r) => r.data);
});

const ProductSchema = z.object({
  id: z.number(),
});

export const getProduct = createServerFn({ method: "GET" })
  .validator(ProductSchema)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return axios.get<Product>(`https://fakestoreapi.com/products/${data.id}`).then((r) => r.data);
  });

const RecommendationSchema = z.object({
  category: z.string(),
  excludeId: z.number(),
});

export const getRecommendations = createServerFn({ method: "GET" })
  .validator(RecommendationSchema)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return axios
      .get<Product[]>(`https://fakestoreapi.com/products/category/${data.category}`)
      .then((r) => r.data.filter((p) => p.id !== data.excludeId).slice(0, 4));
  });

export function getRecommendationsOptions({
  category,
  excludeId,
}: {
  category: string;
  excludeId: number;
}) {
  return queryOptions({
    queryKey: ["recommendations", category, excludeId],
    queryFn: () => getRecommendations({ data: { category: category, excludeId: excludeId } }),
  });
}
