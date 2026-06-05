import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role_code: string;
  }
  interface AuthState {
    token: string | null;
    user: AuthUser | null;
    setAuth: (token: string, user: AuthUser) => void;
    clearAuth: () => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
  }

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),

      isAuthenticated: () => !!get().token,
      isAdmin: () => {
        const role = get().user?.role_code;
        return role === "ADMIN" || role === "SUPER_ADMIN";
      },
    }),
    { name: "auth" },
  ),
);
