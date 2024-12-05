import { useParams } from "react-router-dom";
import { useProductStore } from "../../stores/productStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === parseInt(id || ""));

  if (!product) {
    return <div className="text-center text-2xl mt-10">Product not found</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="space-y-4">
            <p className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
