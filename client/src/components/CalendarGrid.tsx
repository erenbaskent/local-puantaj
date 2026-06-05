import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { MockCalendarEntry } from "@/mocks/data";

const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface CalendarGridProps {
  year: number;
  month: number;
  entries: MockCalendarEntry[];
  onDayClick?: (date: string) => void;
  canAssign?: boolean;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getMondayBasedOffset(year: number, month: number) {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatTime(value: string) {
  return value.slice(0, 5);
}

export function CalendarGrid({
  year,
  month,
  entries,
  onDayClick,
  canAssign = false,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const offset = getMondayBasedOffset(year, month);
  const entryByDate = new Map(entries.map((e) => [e.work_date, e]));
  const today = new Date().toISOString().slice(0, 10);

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="grid grid-cols-7 gap-px bg-stone-200 rounded-xl overflow-hidden border border-stone-200">
      {WEEKDAYS.map((d) => (
        <div
          key={d}
          className="bg-stone-50 px-2 py-2 text-center text-xs font-medium text-stone-500"
        >
          {d}
        </div>
      ))}

      {cells.map((day, idx) => {
        if (day === null) {
          return <div key={`empty-${idx}`} className="bg-white min-h-[88px]" />;
        }

        const dateStr = toDateStr(year, month, day);
        const entry = entryByDate.get(dateStr);
        const isToday = dateStr === today;

        return (
          <button
            key={dateStr}
            type="button"
            disabled={!canAssign}
            onClick={() => canAssign && onDayClick?.(dateStr)}
            className={cn(
              "bg-white min-h-[88px] p-2 text-left flex flex-col gap-1 transition-colors",
              canAssign && "hover:bg-stone-50 cursor-pointer",
              !canAssign && "cursor-default",
              isToday && "ring-2 ring-inset ring-stone-900/20"
            )}
          >
            <span
              className={cn(
                "text-xs font-medium",
                isToday ? "text-stone-900" : "text-stone-500"
              )}
            >
              {day}
            </span>

            {entry ? (
              <div className="flex flex-col gap-0.5">
                <Badge variant="primary" className="text-[10px] w-fit">
                  {entry.shift_code}
                </Badge>
                <span className="text-[10px] text-stone-400 leading-tight">
                  {formatTime(entry.shift_start)}–{formatTime(entry.shift_end)}
                </span>
                {entry.note && (
                  <span className="text-[10px] text-stone-400 truncate">
                    {entry.note}
                  </span>
                )}
              </div>
            ) : canAssign ? (
              <span className="text-[10px] text-stone-300 mt-auto">+</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
