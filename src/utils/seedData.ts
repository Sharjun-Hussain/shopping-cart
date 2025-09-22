import { supabase } from '@/integrations/supabase/client';
import { products as seedProducts } from '@/data/products';

const categoryMapping: Record<string, string> = {
  vegetables: 'Vegetables',
  fruits: 'Fruits', 
  cakes: 'Cakes',
  biscuits: 'Biscuits',
  spices: 'Spices'
};

export const seedProductsToDatabase = async () => {
  try {
    // First, get categories from database
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug, name');
    
    if (categoriesError) throw categoriesError;

    // Create a mapping from category slug to id
    const categoryIdMap: Record<string, string> = {};
    categories?.forEach(cat => {
      categoryIdMap[cat.slug] = cat.id;
    });

    // Transform products data to match database schema
    const transformedProducts = seedProducts.map(product => ({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category_id: categoryIdMap[product.category] || null,
      unit: product.unit,
      in_stock: product.inStock,
      rating: product.rating,
      review_count: product.reviewCount,
    }));

    // Check if products already exist
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id');

    if (existingProducts && existingProducts.length > 0) {
      throw new Error('Products already exist in database');
    }

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(transformedProducts);

    if (error) throw error;

    return { success: true, count: transformedProducts.length };
  } catch (error: any) {
    console.error('Error seeding products:', error);
    throw error;
  }
};