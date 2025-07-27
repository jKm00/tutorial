import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/utils/products";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    return await getProducts();
  },
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((product) => (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              className="block"
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>★</span>
                      <span className="ml-1">{product.rating.rate}</span>
                      <span className="ml-1">({product.rating.count})</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl font-bold text-foreground">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
