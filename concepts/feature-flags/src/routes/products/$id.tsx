import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { legacyRecommendationAlgo, newRecommendationAlgo } from "@/lib/products";
import { Product } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Star } from "lucide-react";
import { user as requestingUser } from "@/auth";

export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = await getProduct({ data: { id: params.id } });
    const recommendations = await getRecommendations({ data: { category: product.category } });

    return {
      product,
      recommendations,
    };
  },
});

const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const res = await fetch(`https://dummyjson.com/products/${data.id}`);
    const json = (await res.json()) as Product;
    return json;
  });

const getRecommendations = createServerFn({ method: "GET" })
  .inputValidator((data: { category: string }) => data)
  .handler(async ({ data }) => {
    const category = data.category;

    // const testUser = ["john@doe.com"]
    // if (requestingUser && testUser.includes(requestingUser.email)) {
    //   return newRecommendationAlgo(category)
    // }

    if (Math.random() < 0.2) {
      return newRecommendationAlgo(category);
    }

    return legacyRecommendationAlgo(category);
  });

function RouteComponent() {
  const { product, recommendations } = Route.useLoaderData();

  return (
    <div className="p-4">
      <section className="mb-8">
        <Card>
          <CardHeader>
            <img src={product.images[0]} />
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-4 text-primary">{product.title}</CardTitle>
            <CardDescription className="mb-4">{product.description}</CardDescription>
            <p>${product.price}</p>
          </CardContent>
        </Card>
      </section>
      <section className="space-y-2 mb-8">
        <h3 className="font-semibold">Review ({product.reviews.length})</h3>
        {product.reviews.map((review, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{review.reviewerName}</CardTitle>
                  <CardDescription>{review.reviewerEmail}</CardDescription>
                </div>
                <div className="flex">
                  {Array.from(Array(review.rating)).map((_, i) => (
                    <Star key={i} className="fill-foreground size-4" />
                  ))}
                  {Array.from(Array(5 - review.rating)).map((_, i) => (
                    <Star key={i} className="size-4" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section>
        <h3 className="font-semibold">Recommendations</h3>
        <div className="grid grid-cols-2 gap-2">
          {recommendations.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img src={product.images[0]} />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-primary">{product.title}</CardTitle>
                <CardDescription>${product.price}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
