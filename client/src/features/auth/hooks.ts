import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi, logoutApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import type { LoginFormValues } from "./schemas";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const showNotification = useUIStore((s) => s.showNotification);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: LoginFormValues) => loginApi(values),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      showNotification("Giriş başarılı", "success");
      navigate("/schedules", { replace: true });
    },
    onError: (error: Error) => {
      showNotification(error.message, "error");
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const showNotification = useUIStore((s) => s.showNotification);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      clearAuth();
      navigate("/login", { replace: true });
      showNotification("Çıkış yapıldı", "info");
    },
  });
}
