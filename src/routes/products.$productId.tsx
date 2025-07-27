import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { getProduct, getRecommendationsOptions } from "@/utils/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { RecommendationsSkeleton } from "@/components/RecommendationsSkeleton";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetails,
  loader: async ({ context, params }) => {
    const productId = parseInt(params.productId);
    const product = await getProduct({ data: { id: productId } });

    context.queryClient.prefetchQuery(
      getRecommendationsOptions({ category: product.category, excludeId: productId })
    );

    return { product };
  },
});

function ProductDetails() {
  const { product } = Route.useLoaderData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="aspect-square bg-background border rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating.rate}</span>
                  <span className="ml-1 text-muted-foreground">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">${product.price}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <RecommendedProducts category={product.category} excludeId={product.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function RecommendedProducts({ category, excludeId }: { category: string; excludeId: number }) {
  const { data } = useSuspenseQuery(getRecommendationsOptions({ category, excludeId }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((recommendedProduct) => (
        <Link
          key={recommendedProduct.id}
          to="/products/$productId"
          params={{ productId: recommendedProduct.id.toString() }}
          className="block"
        >
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.title}
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {recommendedProduct.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{recommendedProduct.rating.rate}</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {recommendedProduct.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {recommendedProduct.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold text-foreground">
                  ${recommendedProduct.price}
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
