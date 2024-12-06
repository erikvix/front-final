
import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "../AdminSidebar.tsx";
import CategoryManagement from "../CategoryManagment/index.tsx";
import ProductManagement from "../ProductManagement/index.tsx";

function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="max-w-screen-xl w-full mx-auto p-4 flex h-screen">
        <AdminSidebar />
        <SidebarInset className="flex-grow p-6 overflow-auto">
          <Routes>
            <Route index element={<Navigate to="categories" replace />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="products" element={<ProductManagement />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default AdminDashboard;
