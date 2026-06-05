/** DB TIME veya ISO string → HTML time input için HH:mm */
export function toTimeInputValue(value: string | null | undefined): string {
  if (!value) return "";
  const match = value.match(/(\d{2}):(\d{2})/);
  if (!match) return "";
  return `${match[1]}:${match[2]}`;
}

/** HTML time input HH:mm → API için HH:mm:ss */
export function toApiTime(value: string): string {
  return value.length === 5 ? `${value}:00` : value;
}

/** Görüntüleme için kısa saat */
export function formatTimeDisplay(value: string | null | undefined): string {
  return toTimeInputValue(value) || "—";
}
