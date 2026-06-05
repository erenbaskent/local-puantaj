import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createScheduleApi,
  getCalendarApi,
  type CreateSchedulePayload,
} from "@/api/schedules";
import { getUsersApi } from "@/api/users";
import { useUIStore } from "@/store/uiStore";

export function calendarKey(year: number, month: number, userId: number) {
  return ["calendar", year, month, userId] as const;
}

export function useCalendar(year: number, month: number, userId: number | null) {
  return useQuery({
    queryKey: calendarKey(year, month, userId ?? 0),
    queryFn: () => getCalendarApi(year, month, userId!),
    enabled: userId !== null && userId > 0,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  const showNotification = useUIStore((s) => s.showNotification);

  return useMutation({
    mutationFn: (payload: CreateSchedulePayload) => createScheduleApi(payload),
    onSuccess: (_data, variables) => {
      const date = new Date(variables.work_date);
      queryClient.invalidateQueries({
        queryKey: calendarKey(
          date.getFullYear(),
          date.getMonth() + 1,
          variables.userId
        ),
      });
      showNotification("Puantaj ataması kaydedildi", "success");
    },
    onError: (error: Error) => {
      showNotification(error.message, "error");
    },
  });
}
