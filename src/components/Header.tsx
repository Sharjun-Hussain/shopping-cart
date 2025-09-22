import { ShoppingBag, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
  onAuthOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ cartItemsCount, onCartOpen, onAuthOpen, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        {/* Mobile Layout */}
        <div className="flex md:hidden h-14 items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="h-6 w-6 rounded-full bg-professional flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="h-3 w-3 text-professional-foreground" />
            </div>
            <h1 className="text-sm font-bold text-professional truncate">
              Shopping Cart
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="professional"
              size="sm"
              onClick={onAuthOpen}
              className="h-8 px-3 text-xs hover:text-black"
            >
              <User className="h-3 w-3 mr-1" />
              Sign In
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="relative border-professional text-professional hover:bg-professional hover:text-black h-8 w-8 p-0"
              onClick={onCartOpen}
            >
              <ShoppingBag className="h-3 w-3" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-professional"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-9 focus-visible:ring-professional text-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-professional flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-professional-foreground" />
              </div>
              <h1 className="text-xl font-bold text-professional">
                Shopping Cart Application
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search Sri Lankan products..."
                className="pl-10 focus-visible:ring-professional"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="professional"
              size="sm"
              onClick={onAuthOpen}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 hover:text-black"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="relative border-professional text-professional hover:bg-professional hover:text-black"
              onClick={onCartOpen}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-professional hover:bg-professional"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};