import { Button } from "@/components/ui/button";

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "all", name: "All", color: "professional", icon: "🛒" },
  { id: "vegetables", name: "Vegetables", color: "professional", icon: "🥬" },
  { id: "fruits", name: "Fruits", color: "professional", icon: "🍎" },
  { id: "cakes", name: "Cakes", color: "professional", icon: "🎂" },
  { id: "biscuits", name: "Biscuits", color: "professional", icon: "🍪" },
  { id: "spices", name: "Spices", color: "professional", icon: "🌿" },
];

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryNav = ({ selectedCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="sticky top-14 md:top-16 z-40 w-full bg-background/95 backdrop-blur border-b">
      <div className="container px-4 md:px-6 py-3 md:py-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`flex items-center space-x-1 md:space-x-2 whitespace-nowrap transition-all min-h-[36px] px-3 md:px-4 ${
                selectedCategory === category.id
                  ? "bg-professional hover:bg-professional-dark text-professional-foreground shadow-md"
                  : "hover:bg-professional-light hover:text-professional-dark hover:border-professional"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="text-sm md:text-lg">{category.icon}</span>
              <span className="text-xs md:text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};