import api from "@/api";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  token: "",
  login: (username, password) => {
    api.post("/users/login", { username, password }).then((response) => {
      set({
        isAuthenticated: true,
        isAdmin: true,
        token: response.data.token,
      });
      return true;
    });

    return false;
  },
  logout: () => set({ isAuthenticated: false, isAdmin: false, token: "" }),
}));
