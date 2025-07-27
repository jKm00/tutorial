import { createFileRoute, Link } from "@tanstack/react-router";
import { getProducts } from "@/utils/products";
import ProductCard from "@/components/ProductCard";

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
