import { ProductsResponse } from "@/types";

export async function legacyRecommendationAlgo(category: string) {
  const res = await fetch("https://dummyjson.com/products");
  const data = (await res.json()) as ProductsResponse;
  return data;
}

export async function newRecommendationAlgo(category: string) {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  const data = (await res.json()) as ProductsResponse;
  return data;
}
