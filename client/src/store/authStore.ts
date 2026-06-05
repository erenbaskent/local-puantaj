import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types";

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
    {
      name: "puantaj-auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
