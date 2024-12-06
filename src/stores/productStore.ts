import { create } from "zustand";
import { Category, Product } from "../types/type";
import api from "../api";
import axios from "axios";

interface ProductState {
  categories: Category[];
  products: Product[];
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">, file: File) => Promise<void>;
  editProduct: (
    id: number,
    updatedProduct: Partial<Product>,
    file?: File
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  editCategory: (
    id: number,
    updatedCategory: Partial<Category>
  ) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  categories: [],
  products: [],
  error: null,

  fetchCategories: async () => {
    try {
      const response = await api.get("/category");
      set({ categories: response.data, error: null });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: "Failed to fetch categories" });
    }
  },

  fetchProducts: async () => {
    try {
      const response = await api.get("/products");
      set({ products: response.data, error: null });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: "Failed to fetch products" });
    }
  },

  addProduct: async (product, file) => {
    try {
      const data = new FormData();
      data.append("name", product.name);
      data.append("description", product.description);
      data.append("price", product.price.toString());
      data.append("categoryId", product.categoryId.toString());
      data.append("image", file);
      console.log(data);

      const response = await axios.post(
        "http://localhost:8080/products",
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkVyaWsiLCJlbWFpbCI6ImVyaWt2aXh4QGdtYWlsLmNvbSIsImlhdCI6MTczMzUwODA5NCwiZXhwIjoxNzM2MTAwMDk0fQ.RN__bLBSygnI-8oBpL5UuiSZAzuxz6gQbk_ktWLqeG8",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      set((state) => ({
        error: null,
      }));
    } catch (error) {
      console.error("Error adding product:", error);
      set({ error: "Failed to add product" });
    }
  },

  editProduct: async (id, updatedProduct, file) => {
    try {
      const data = new FormData();
      Object.entries(updatedProduct).forEach(([key, value]) => {
        data.append(key, value as string);
      });

      if (file) {
        data.append("file", file);
      }

      const response = await api.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...response.data } : product
        ),
        error: null,
      }));
    } catch (error) {
      console.error("Error editing product:", error);
      set({ error: "Failed to edit product" });
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ error: "Failed to delete product" });
    }
  },

  addCategory: async (category: Category) => {
    try {
      await api.post("/category", category);
      set((state) => ({
        error: null,
      }));
    } catch (error) {
      console.error("Error adding category:", error);
      set({ error: "Failed to add category" });
    }
  },

  editCategory: async (id, updatedCategory) => {
    try {
      const response = await api.put(`/category/${id}`, updatedCategory);
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, ...response.data } : category
        ),
        error: null,
      }));
    } catch (error) {
      console.error("Error editing category:", error);
      set({ error: "Failed to edit category" });
    }
  },

  deleteCategory: async (id) => {
    try {
      await api.delete(`/category/${id}`);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
      set({ error: "Failed to delete category" });
    }
  },
}));
