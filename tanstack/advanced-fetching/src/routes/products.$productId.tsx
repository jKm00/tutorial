import { createFileRoute } from "@tanstack/react-router";
import { getProduct, getRecommendationsOptions } from "@/utils/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { RecommendationsSkeleton } from "@/components/RecommendationsSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage,
  loader: async ({ context, params }) => {
    const productId = parseInt(params.productId);
    const product = await getProduct({ data: { id: productId } });

    context.queryClient.prefetchQuery(
      getRecommendationsOptions({ category: product.category, excludeId: productId })
    );

    return { product };
  },
});

function ProductDetailsPage() {
  const { product } = Route.useLoaderData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <ProductDetails product={product} />
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
        <ProductCard product={recommendedProduct} />
      ))}
    </div>
  );
}
