import { useMemo, useState } from "react";
import { CalendarGrid } from "@/components/CalendarGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MOCK_CALENDAR_ENTRIES } from "@/mocks/data";

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const currentDate = new Date();

export default function PersonalCalendarPage() {
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const yearOptions = useMemo(() => {
    const y = currentDate.getFullYear();
    return [y - 1, y, y + 1];
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">Kişisel Takvimim</h1>
        <p className="text-sm text-stone-500 mt-1">
          Kendi aylık vardiya planınızı görüntüleyin
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year">Yıl</Label>
              <Select
                id="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-28"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="month">Ay</Label>
              <Select
                id="month"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-36"
              >
                {MONTHS.map((name, i) => (
                  <option key={name} value={i + 1}>{name}</option>
                ))}
              </Select>
            </div>
          </div>

          <CalendarGrid
            year={year}
            month={month}
            entries={MOCK_CALENDAR_ENTRIES}
            canAssign={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
