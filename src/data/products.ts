import { Product } from "@/types/product";
import coconutsImg from "@/assets/coconuts.jpg";
import mangoesImg from "@/assets/mangoes.jpg";
import cinnamonImg from "@/assets/cinnamon.jpg";
import teaLeavesImg from "@/assets/tea-leaves.jpg";
import curryLeavesImg from "@/assets/curry-leaves.jpg";
import kiribathImg from "@/assets/kiribath.jpg";
import kokisImg from "@/assets/kokis.jpg";
import dragonFruitImg from "@/assets/dragon-fruit.jpg";

export const products: Product[] = [
  // Fresh Produce
  {
    id: "1",
    name: "Fresh Coconuts",
    price: 350.00,
    image: coconutsImg,
    description: "Fresh King Coconuts from Sri Lankan farms, sweet water and tender meat",
    category: "vegetables",
    unit: "piece",
    inStock: true,
    rating: 4.8,
    reviewCount: 245
  },
  {
    id: "2",
    name: "Curry Leaves",
    price: 150.00,
    image: curryLeavesImg,
    description: "Fresh aromatic curry leaves, essential for authentic Sri Lankan cooking",
    category: "vegetables",
    unit: "bunch",
    inStock: true,
    rating: 4.9,
    reviewCount: 189
  },
  {
    id: "3",
    name: "Gotukola",
    price: 120.00,
    image: "/api/placeholder/300/300",
    description: "Fresh Gotukola leaves, perfect for traditional Sri Lankan mallung",
    category: "vegetables",
    unit: "bunch",
    inStock: true,
    rating: 4.6,
    reviewCount: 87
  },
  {
    id: "4",
    name: "Mukunuwenna",
    price: 100.00,
    image: "/api/placeholder/300/300",
    description: "Fresh Mukunuwenna leaves, great for healthy Sri Lankan curry",
    category: "vegetables",
    unit: "bunch",
    inStock: true,
    rating: 4.5,
    reviewCount: 134
  },

  // Fruits
  {
    id: "5",
    name: "Alphonso Mangoes",
    price: 450.00,
    image: mangoesImg,
    description: "Premium sweet mangoes from Sri Lankan orchards, naturally ripened",
    category: "fruits",
    unit: "kg",
    inStock: true,
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: "6",
    name: "Dragon Fruit",
    price: 380.00,
    image: dragonFruitImg,
    description: "Fresh dragon fruit, sweet and refreshing tropical delight",
    category: "fruits",
    unit: "piece",
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: "7",
    name: "Rambutan",
    price: 320.00,
    image: "/api/placeholder/300/300",
    description: "Sweet and juicy rambutan, exotic Sri Lankan tropical fruit",
    category: "fruits",
    unit: "kg",
    inStock: true,
    rating: 4.6,
    reviewCount: 98
  },
  {
    id: "8",
    name: "Wood Apple",
    price: 280.00,
    image: "/api/placeholder/300/300",
    description: "Traditional wood apple, perfect for refreshing drinks and desserts",
    category: "fruits",
    unit: "piece",
    inStock: true,
    rating: 4.4,
    reviewCount: 76
  },

  // Traditional Sweets
  {
    id: "9",
    name: "Kiribath",
    price: 450.00,
    image: kiribathImg,
    description: "Traditional Sri Lankan milk rice, perfect for special occasions",
    category: "cakes",
    unit: "portion",
    inStock: true,
    rating: 4.9,
    reviewCount: 267
  },
  {
    id: "10",
    name: "Watalappan",
    price: 380.00,
    image: "/api/placeholder/300/300",
    description: "Traditional Sri Lankan steamed dessert with jaggery and coconut milk",
    category: "cakes",
    unit: "cup",
    inStock: true,
    rating: 4.8,
    reviewCount: 201
  },
  {
    id: "11",
    name: "Kiri Pani",
    price: 320.00,
    image: "/api/placeholder/300/300",
    description: "Traditional milk toffee, rich and creamy Sri Lankan sweet",
    category: "cakes",
    unit: "piece",
    inStock: false,
    rating: 4.7,
    reviewCount: 143
  },

  // Traditional Biscuits & Snacks
  {
    id: "12",
    name: "Kokis",
    price: 280.00,
    image: kokisImg,
    description: "Traditional Sri Lankan oil cakes, crispy flower-shaped treats",
    category: "biscuits",
    unit: "dozen",
    inStock: true,
    rating: 4.8,
    reviewCount: 189
  },
  {
    id: "13",
    name: "Aggala",
    price: 240.00,
    image: "/api/placeholder/300/300",
    description: "Traditional Sri Lankan sweet balls made with rice flour and jaggery",
    category: "biscuits",
    unit: "dozen",
    inStock: true,
    rating: 4.6,
    reviewCount: 145
  },
  {
    id: "14",
    name: "Athirasa",
    price: 320.00,
    image: "/api/placeholder/300/300",
    description: "Traditional deep-fried sweet pancakes with jaggery",
    category: "biscuits",
    unit: "dozen",
    inStock: true,
    rating: 4.7,
    reviewCount: 167
  },

  // Spices
  {
    id: "15",
    name: "Ceylon Cinnamon",
    price: 850.00,
    image: cinnamonImg,
    description: "Premium Ceylon cinnamon sticks, world's finest cinnamon from Sri Lanka",
    category: "spices",
    unit: "100g",
    inStock: true,
    rating: 4.9,
    reviewCount: 345
  },
  {
    id: "16",
    name: "Ceylon Tea Leaves",
    price: 650.00,
    image: teaLeavesImg,
    description: "Premium Ceylon black tea leaves from the hill country",
    category: "spices",
    unit: "250g",
    inStock: true,
    rating: 4.8,
    reviewCount: 298
  }
];