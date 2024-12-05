import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  login: (username, password) => {
    if (username === "admin" && password === "password") {
      set({ isAuthenticated: true, isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, isAdmin: false }),
}));
