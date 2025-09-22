import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.unit} of ${product.name} added to your cart.`,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Card className="group h-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-card/50">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs">
            Out of Stock
          </Badge>
        )}
        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
      </div>

      <CardContent className="flex-1 p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-2xl font-bold text-professional">LKR {product.price.toFixed(2)}</span>
          <span className="text-xs md:text-sm text-muted-foreground">per {product.unit}</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-4 pt-0 space-y-3">
        <div className="flex items-center justify-center space-x-3 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-9 w-9 md:h-8 md:w-8 p-0 border-professional text-professional hover:bg-professional hover:text-black touch-manipulation"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-medium min-w-[2rem] text-center text-sm md:text-base">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={incrementQuantity}
            className="h-9 w-9 md:h-8 md:w-8 p-0 border-professional text-professional hover:bg-professional hover:text-black touch-manipulation"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="professional"
          className="w-full h-10 md:h-9 shadow-sm hover:shadow-md transition-all text-sm md:text-base hover:text-black touch-manipulation"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};