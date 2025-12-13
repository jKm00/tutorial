import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Search, User, Store } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <Store className="h-6 w-6" />
              <span>Store</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                activeProps={{
                  className: "text-primary font-medium",
                }}
                activeOptions={{ exact: true }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
