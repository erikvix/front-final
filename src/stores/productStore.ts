import { create } from "zustand";
import { Category, Product } from "../types/type";

interface ProductState {
  categories: Category[];
  products: Product[];
  addCategory: (category: Omit<Category, "id">) => void;
  editCategory: (id: number, updatedCategory: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  editProduct: (id: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  categories: [
    { id: 1, name: "T-shirts" },
    { id: 2, name: "Accessories" },
  ],
  products: [
    {
      id: 1,
      name: "Classic White Tee",
      description: "A comfortable white t-shirt",
      price: 19.99,
      categoryId: 1,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Vintage Black Tee",
      description: "A stylish black t-shirt",
      price: 24.99,
      categoryId: 1,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Graphic Print Tee",
      description: "A trendy graphic t-shirt",
      price: 29.99,
      categoryId: 1,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Leather Wallet",
      description: "A durable leather wallet",
      price: 39.99,
      categoryId: 2,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Sunglasses",
      description: "Stylish UV-protected sunglasses",
      price: 49.99,
      categoryId: 2,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Watch",
      description: "A classic analog watch",
      price: 99.99,
      categoryId: 2,
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, { ...category, id: Date.now() }],
    })),
  editCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now() }],
    })),
  editProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
