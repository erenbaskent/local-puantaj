import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  return {
    token,
    user,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
  };
}
