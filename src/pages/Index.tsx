import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ProductForm } from '@/components/ProductForm';
import { useProducts, Product } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { seedProductsToDatabase } from '@/utils/seedData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { products, categories, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

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

  const handleCreate = async (productData: any) => {
    await createProduct(productData);
  };

  const handleUpdate = async (productData: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <div className="flex space-x-2">
            {products.length === 0 && (
              <Button variant="outline" onClick={handleSeedData} disabled={isSeeding}>
                <Upload className="h-4 w-4 mr-2" />
                {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
              </Button>
            )}
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="flex justify-between items-start">
                  <span>{product.name}</span>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  LKR {product.price} per {product.unit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Category: {product.category?.name || 'None'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found</p>
            <div className="space-x-2">
              <Button onClick={handleSeedData} disabled={isSeeding}>
                <Upload className="h-4 w-4 mr-2" />
                {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
              </Button>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create your first product
              </Button>
            </div>
          </div>
        )}

        <ProductForm
          product={editingProduct}
          categories={categories}
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
        />
      </div>
    </AdminLayout>
  );
};

export default Index;
