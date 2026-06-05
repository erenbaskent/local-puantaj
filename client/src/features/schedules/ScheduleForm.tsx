import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { Shift } from "@/types";

const scheduleSchema = z.object({
  shift_code: z.string().min(1, "Vardiya seçin"),
  note: z.string().optional(),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
  workDate: string;
  shifts: Shift[];
  onSubmit: (values: ScheduleFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ScheduleForm({
  workDate,
  shifts,
  onSubmit,
  onCancel,
  isLoading,
}: ScheduleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { shift_code: "", note: "" },
  });

  const formattedDate = new Date(workDate + "T00:00:00").toLocaleDateString(
    "tr-TR",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-600">
        {formattedDate}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="shift_code">Vardiya</Label>
        <Select id="shift_code" {...register("shift_code")}>
          <option value="">Vardiya seçin</option>
          {shifts.map((s) => (
            <option key={s.id} value={s.code}>
              {s.name} ({s.code})
            </option>
          ))}
        </Select>
        {errors.shift_code && (
          <p className="text-xs text-red-600">{errors.shift_code.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="note">Not (opsiyonel)</Label>
        <Input id="note" {...register("note")} placeholder="Açıklama..." />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
