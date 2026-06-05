import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShiftApi,
  deleteShiftApi,
  getShiftsApi,
  updateShiftApi,
  type ShiftPayload,
} from "@/api/shifts";
import { useUIStore } from "@/store/uiStore";

export const SHIFTS_KEY = ["shifts"] as const;

export function useShifts() {
  return useQuery({
    queryKey: SHIFTS_KEY,
    queryFn: getShiftsApi,
  });
}

export function useCreateShift() {
  const queryClient = useQueryClient();
  const showNotification = useUIStore((s) => s.showNotification);

  return useMutation({
    mutationFn: (payload: ShiftPayload) => createShiftApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIFTS_KEY });
      showNotification("Vardiya oluşturuldu", "success");
    },
    onError: (error: Error) => {
      showNotification(error.message, "error");
    },
  });
}

export function useUpdateShift() {
  const queryClient = useQueryClient();
  const showNotification = useUIStore((s) => s.showNotification);

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<ShiftPayload>;
    }) => updateShiftApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIFTS_KEY });
      showNotification("Vardiya güncellendi", "success");
    },
    onError: (error: Error) => {
      showNotification(error.message, "error");
    },
  });
}

export function useDeleteShift() {
  const queryClient = useQueryClient();
  const showNotification = useUIStore((s) => s.showNotification);

  return useMutation({
    mutationFn: (id: number) => deleteShiftApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIFTS_KEY });
      showNotification("Vardiya silindi", "success");
    },
    onError: (error: Error) => {
      showNotification(error.message, "error");
    },
  });
}
