import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shiftSchema, type ShiftFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { Shift } from "@/types";
import { toApiTime, toTimeInputValue } from "@/lib/formatTime";

interface ShiftFormProps {
  shift?: Shift | null;
  onSubmit: (values: ShiftFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ShiftForm({ shift, onSubmit, onCancel, isLoading }: ShiftFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: "",
      code: "",
      start_time: "",
      end_time: "",
    },
  });

  useEffect(() => {
    if (shift) {
      reset({
        name: shift.name,
        code: shift.code,
        start_time: toTimeInputValue(shift.start_time),
        end_time: toTimeInputValue(shift.end_time),
      });
    } else {
      reset({ name: "", code: "", start_time: "", end_time: "" });
    }
  }, [shift, reset]);

  const handleFormSubmit = (values: ShiftFormValues) => {
    onSubmit({
      ...values,
      start_time: toApiTime(values.start_time),
      end_time: toApiTime(values.end_time),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Vardiya Adı</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Kod</Label>
        <Input id="code" {...register("code")} className="uppercase" />
        {errors.code && (
          <p className="text-xs text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start_time">Başlangıç</Label>
          <Input id="start_time" type="time" {...register("start_time")} />
          {errors.start_time && (
            <p className="text-xs text-red-600">{errors.start_time.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end_time">Bitiş</Label>
          <Input id="end_time" type="time" {...register("end_time")} />
          {errors.end_time && (
            <p className="text-xs text-red-600">{errors.end_time.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : shift ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  );
}
