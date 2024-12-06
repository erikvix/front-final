import { Link } from "react-router-dom";
import { useProductStore } from "../../stores/productStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types/type";
import { useEffect } from "react";

function HomePage() {
  const { categories, products, fetchCategories, fetchProducts } =
    useProductStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Welcome to Hyuji Store</h1>
      {categories.map((category: Category) => (
        <div key={category.id}>
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((product: Product) => product.categoryId === category.id)
              .slice(0, 3)
              .map((product: Product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p className="mt-2 text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button asChild>
                      <Link to={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
