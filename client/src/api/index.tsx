import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ??
        error.response?.data?.messsage ??
        "Bir hata oluştu";
      if (status === 401 || status === 403) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
      return Promise.reject(new Error(message));
    }
  );

  export default api;