import { apiClient } from "./client";
import type { ApiResponse, User } from "@/types";

export async function getUsersApi() {
  const res = await apiClient<ApiResponse<User[]>>("/users/");
  return res.data;
}
