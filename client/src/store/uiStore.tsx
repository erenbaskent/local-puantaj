import { toast } from "sonner";
import { create } from "zustand";

export interface Notification {
  message: string;
  type: "success" | "error" | "info";
}

interface UIStore {
  sidebarOpen: boolean;
  notification: Notification | null;
  toggleSidebar: () => void;
  showNotification: (message: string, type?: Notification["type"]) => void;
  clearNotification: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  notification: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  showNotification: (
    message: string,
    type: string = "success",
    duration: number = 2000,
  ) => {
    if (type === "success") toast.success(message, { duration: duration });
    else if (type === "error") toast.error(message, { duration: duration });
    else toast.info(message, { duration: duration });
  },

  clearNotification: () => set({ notification: null }),
}));
