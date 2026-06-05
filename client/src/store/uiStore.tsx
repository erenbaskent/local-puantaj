import { create } from "zustand";
import type { Notification } from "@/types";

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

  showNotification: (message, type = "success") => {
    set({ notification: { message, type } });
    setTimeout(() => set({ notification: null }), 3000);
  },

  clearNotification: () => set({ notification: null }),
}));
