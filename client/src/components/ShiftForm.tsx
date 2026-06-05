import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MockShift } from "@/mocks/data";

export interface ShiftFormValues {
  name: string;
  code: string;
  start_time: string;
  end_time: string;
}

interface ShiftFormProps {
  shift?: MockShift | null;
  onSubmit: (values: ShiftFormValues) => void;
  onCancel: () => void;
}

export function ShiftForm({ shift, onSubmit, onCancel }: ShiftFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: fd.get("name") as string,
      code: fd.get("code") as string,
      start_time: fd.get("start_time") as string,
      end_time: fd.get("end_time") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Vardiya Adı</Label>
        <Input id="name" name="name" defaultValue={shift?.name ?? ""} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Kod</Label>
        <Input
          id="code"
          name="code"
          defaultValue={shift?.code ?? ""}
          className="uppercase"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start_time">Başlangıç</Label>
          <Input
            id="start_time"
            name="start_time"
            type="time"
            defaultValue={shift?.start_time?.slice(0, 5) ?? ""}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end_time">Bitiş</Label>
          <Input
            id="end_time"
            name="end_time"
            type="time"
            defaultValue={shift?.end_time?.slice(0, 5) ?? ""}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">{shift ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  );
}
