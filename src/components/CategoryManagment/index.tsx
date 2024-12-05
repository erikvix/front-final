import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/stores/productStore";

function CategoryManagement() {
  const { categories, addCategory, editCategory, deleteCategory } =
    useProductStore();
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ name: newCategory.trim() });
      setNewCategory("");
    }
  };

  const handleEditCategory = (id: number, newName: string) => {
    editCategory(id, { name: newName });
    setEditingId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between bg-secondary p-4 rounded-lg"
            >
              {editingId === category.id ? (
                <Input
                  type="text"
                  defaultValue={category.name}
                  onBlur={(e) =>
                    handleEditCategory(category.id, e.target.value)
                  }
                  autoFocus
                />
              ) : (
                <span>{category.name}</span>
              )}
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setEditingId(category.id)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default CategoryManagement;
