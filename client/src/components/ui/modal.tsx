import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-stone-900/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="modal-title"
        className={cn(
          "relative z-10 w-full max-w-md rounded-xl border border-stone-200 bg-white shadow-xl",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-stone-900">
            {title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Kapat">
            ✕
          </Button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
