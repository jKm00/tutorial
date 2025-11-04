import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsResponse } from "@/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await getProdust(),
});

const getProdust = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = (await res.json()) as ProductsResponse;
  return data;
});

function App() {
  const data = Route.useLoaderData();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="font-semibold text-3xl mb-4">Products</h2>
      {data.products.map((product) => (
        <Link key={product.id} to="/products/$id" params={{ id: `${product.id}` }}>
          <Card>
            <CardHeader>
              <img src={product.images[0]} />
            </CardHeader>
            <CardContent>
              <ul className="flex gap-4 mb-4 text-xs">
                <li>{product.brand}</li>
                <li>{product.category}</li>
                <li>{product.availabilityStatus}</li>
              </ul>
              <CardTitle className="mb-4 text-primary">{product.title}</CardTitle>
              <CardDescription className="mb-4">{product.description}</CardDescription>
              <Button>
                Shop <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
