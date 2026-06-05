import { apiClient } from "./client";
import type { LoginResponse } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginApi(payload: LoginPayload) {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function logoutApi() {
  return apiClient<{ ok: boolean; message: string }>("/auth/logout", {
    method: "POST",
  });
}
