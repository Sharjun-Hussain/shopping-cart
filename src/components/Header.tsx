import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/types/product";

interface HeaderProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ cartItems, onCartOpen, searchQuery, onSearchChange }: HeaderProps) => {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">🛒 Store</span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
            <span className="sr-only">User account</span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onCartOpen} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {itemCount}
              </Badge>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};