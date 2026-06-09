import type { LoginResponse } from "@/types/auth";
import api from ".";

export const loginApi = (identifier: string, password: string) => {
  return api.post<LoginResponse>("/auth/login", { email: identifier, password });
};

export const logoutApi = () => {
  return api.post<{ ok: boolean; message: string }>("/auth/logout");
};
