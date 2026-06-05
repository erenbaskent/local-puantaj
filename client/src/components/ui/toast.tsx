import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/cn";

const typeStyles = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-stone-800 text-white",
};

export function Toast() {
  const notification = useUIStore((s) => s.notification);

  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] max-w-sm animate-in fade-in">
      <div
        className={cn(
          "rounded-lg px-4 py-3 text-sm font-medium shadow-lg",
          typeStyles[notification.type]
        )}
      >
        {notification.message}
      </div>
    </div>
  );
}
