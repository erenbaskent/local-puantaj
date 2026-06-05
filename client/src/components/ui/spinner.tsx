import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-stone-200 border-t-stone-900",
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Yükleniyor"
    />
  );
}
