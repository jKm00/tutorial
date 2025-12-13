import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";

export default function ProductDetails({ product }: { product: any }) {
  return (
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
              <span className="ml-1 text-muted-foreground">({product.rating.count} reviews)</span>
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
  );
}
