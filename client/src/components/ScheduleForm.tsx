import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { MockShift } from "@/mocks/data";

export interface ScheduleFormValues {
  shift_code: string;
  note?: string;
}

interface ScheduleFormProps {
  workDate: string;
  shifts: MockShift[];
  onSubmit: (values: ScheduleFormValues) => void;
  onCancel: () => void;
}

export function ScheduleForm({
  workDate,
  shifts,
  onSubmit,
  onCancel,
}: ScheduleFormProps) {
  const formattedDate = new Date(workDate + "T00:00:00").toLocaleDateString(
    "tr-TR",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      shift_code: fd.get("shift_code") as string,
      note: (fd.get("note") as string) || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-600">
        {formattedDate}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="shift_code">Vardiya</Label>
        <Select id="shift_code" name="shift_code" defaultValue="">
          <option value="">Vardiya seçin</option>
          {shifts.map((s) => (
            <option key={s.id} value={s.code}>
              {s.name} ({s.code})
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="note">Not (opsiyonel)</Label>
        <Input id="note" name="note" placeholder="Açıklama..." />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}
