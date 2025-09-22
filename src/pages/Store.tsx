import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSheet } from "@/components/CartSheet";
import { useProducts } from "@/hooks/useProducts";
import { CartItem, Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { seedProductsToDatabase } from "@/utils/seedData";

export const Store = () => {
  const { products, categories, loading } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  // Transform products from Supabase format to local format
  const transformedProducts: Product[] = useMemo(() => {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "",
      category: product.category?.name || "Uncategorized",
      unit: product.unit,
      inStock: product.in_stock,
      rating: product.rating || 0,
      reviewCount: product.review_count || 0,
    }));
  }, [products]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = transformedProducts;

    if (selectedCategory) {
      filtered = filtered.filter(product => {
        const productCategory = products.find(p => p.id === product.id)?.category_id;
        return productCategory === selectedCategory;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transformedProducts, selectedCategory, searchQuery, products]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout .",
    });
    setIsCartOpen(false);
  };

  const handleSeedData = async () => {
    if (products.length > 0) {
      toast({
        title: 'Data Already Exists',
        description: 'Products already exist in the database',
        variant: 'destructive',
      });
      return;
    }

    setIsSeeding(true);
    try {
      const result = await seedProductsToDatabase();
      toast({
        title: 'Success',
        description: `Seeded ${result.count} products to database`,
      });
      window.location.reload(); // Refresh to show new data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to seed data',
        variant: 'destructive',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          cartItems={cartItems}
          onCartOpen={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold">Welcome to Our Store</h2>
            <p className="text-muted-foreground">No products available yet. Seed some sample data to get started!</p>
            <Button onClick={handleSeedData} disabled={isSeeding}>
              <Upload className="h-4 w-4 mr-2" />
              {isSeeding ? 'Seeding...' : 'Load Sample Products'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItems={cartItems}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <main className="flex-1 container py-6">
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>
      
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};
