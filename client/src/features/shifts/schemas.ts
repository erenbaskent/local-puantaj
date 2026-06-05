import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export const shiftSchema = z.object({
  name: z.string().min(1, "Vardiya adı gerekli"),
  code: z.string().min(1, "Kod gerekli").max(15, "Kod en fazla 15 karakter"),
  start_time: z.string().regex(timeRegex, "Geçerli bir başlangıç saati girin (HH:mm)"),
  end_time: z.string().regex(timeRegex, "Geçerli bir bitiş saati girin (HH:mm)"),
});

export type ShiftFormValues = z.infer<typeof shiftSchema>;
