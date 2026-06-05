import { apiClient } from "./client";
import type { CalendarEntry, CalendarResponse } from "@/types";

export interface CreateSchedulePayload {
  userId: number;
  work_date: string;
  shift_code: string;
  note?: string;
}

export async function getCalendarApi(year: number, month: number, userId: number) {
  const params = new URLSearchParams({
    year: String(year),
    month: String(month),
    userId: String(userId),
  });
  const res = await apiClient<CalendarResponse>(
    `/monthly-schedules/calendar?${params}`
  );
  return res.data;
}

export async function createScheduleApi(payload: CreateSchedulePayload) {
  const res = await apiClient<{ data: CalendarEntry }>("/monthly-schedules/create", {
    method: "POST",
    body: payload,
  });
  return res.data;
}
