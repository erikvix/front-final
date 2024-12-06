import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosInstance } from "axios";

// Criação de uma instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState(); // Obtenha o token dinamicamente
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
