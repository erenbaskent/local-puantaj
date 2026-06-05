import { apiClient } from "./client";
import type { ApiResponse, Shift } from "@/types";

export interface ShiftPayload {
  name: string;
  code: string;
  start_time: string;
  end_time: string;
}

export async function getShiftsApi() {
  const res = await apiClient<ApiResponse<Shift[]>>("/shift/");
  return res.data;
}

export async function createShiftApi(payload: ShiftPayload) {
  const res = await apiClient<ApiResponse<Shift>>("/shift/create", {
    method: "POST",
    body: payload,
  });
  return res.data;
}

export async function updateShiftApi(id: number, payload: Partial<ShiftPayload>) {
  const res = await apiClient<ApiResponse<Shift>>(`/shift/update/${id}`, {
    method: "PUT",
    body: { data: payload },
  });
  return res.data;
}

export async function deleteShiftApi(id: number) {
  const res = await apiClient<ApiResponse<Shift>>(`/shift/delete/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
