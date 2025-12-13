import { Product } from "@/utils/products";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      key={product.id}
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      className="block"
    >
      <Card>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">{product.rating.rate}</span>
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
            <span className="text-lg font-bold text-foreground">${product.price}</span>
            <Button size="sm">Add to Cart</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
