import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/stores/productStore";
import { Product } from "@/types/type";
import FileUpload from "../ui/fileupload";

function ProductManagement() {
  const {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProductStore();

  const [newProduct, setNewProduct] = useState<Product & { file?: File }>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    imageUrl: "",
    file: undefined,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddProduct = async () => {
    if (
      newProduct.name &&
      newProduct.description &&
      newProduct.price &&
      newProduct.categoryId &&
      newProduct.file
    ) {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price.toString());
      formData.append("categoryId", newProduct.categoryId.toString());
      formData.append("file", newProduct.file);

      await addProduct(newProduct, newProduct.file);
      fetchProducts();
      setNewProduct({
        id: 0,
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        imageUrl: "",
        file: undefined,
      });
    }
  };

  const handleEditProduct = async (
    id: number,
    updatedProduct: Partial<Product>
  ) => {
    await editProduct(id, updatedProduct);
    setEditingId(null);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    console.log(products);
  }, [fetchProducts, fetchCategories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Product name"
          />
          <Input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Product description"
          />
          <Input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            placeholder="Product price"
          />
          <Select
            onValueChange={(value) =>
              setNewProduct({ ...newProduct, categoryId: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <FileUpload
            onChange={(fileUrl, file) =>
              setNewProduct({ ...newProduct, imageUrl: fileUrl, file })
            }
            currentImage={newProduct.imageUrl}
          />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="bg-secondary p-4 rounded-lg">
              {editingId === product.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    defaultValue={product.name}
                    onChange={(e) =>
                      handleEditProduct(product.id, { name: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    defaultValue={product.description}
                    onChange={(e) =>
                      handleEditProduct(product.id, {
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="number"
                    defaultValue={product.price.toString()}
                    onChange={(e) =>
                      handleEditProduct(product.id, {
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                  <Select
                    onValueChange={(value) =>
                      handleEditProduct(product.id, {
                        categoryId: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          categories.find((c) => c.id === product.categoryId)
                            ?.name
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FileUpload
                    onChange={(fileUrl, file) =>
                      handleEditProduct(product.id, { imageUrl: fileUrl })
                    }
                    currentImage={product.imageUrl}
                  />
                  <Button onClick={() => setEditingId(null)}>Save</Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <p className="text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingId(product.id)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default ProductManagement;
