import { useMemo, useState } from "react";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ScheduleForm } from "@/components/ScheduleForm";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useUIStore } from "@/store/uiStore";
import {
  MOCK_CALENDAR_ENTRIES,
  MOCK_SHIFTS,
  MOCK_USERS,
  type MockCalendarEntry,
} from "@/mocks/data";

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const currentDate = new Date();

export default function SchedulesPage() {
  const showNotification = useUIStore((s) => s.showNotification);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [entries, setEntries] = useState(MOCK_CALENDAR_ENTRIES);
  const [assignDate, setAssignDate] = useState<string | null>(null);

  const yearOptions = useMemo(() => {
    const y = currentDate.getFullYear();
    return [y - 1, y, y + 1];
  }, []);

  const closeAssignModal = () => setAssignDate(null);

  const handleAssign = (values: { shift_code: string; note?: string }) => {
    if (!assignDate) return;
    const shift = MOCK_SHIFTS.find((s) => s.code === values.shift_code);
    if (!shift) return;

    const newEntry: MockCalendarEntry = {
      work_date: assignDate,
      shift_code: shift.code,
      shift_start: shift.start_time,
      shift_end: shift.end_time,
      note: values.note,
    };

    setEntries((prev) => {
      const filtered = prev.filter((e) => e.work_date !== assignDate);
      return [...filtered, newEntry];
    });

    showNotification("Vardiya ataması kaydedildi (örnek)", "success");
    closeAssignModal();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">Puantaj Takvimi</h1>
        <p className="text-sm text-stone-500 mt-1">
          Aylık vardiya planını görüntüleyin ve atama yapın
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

            <div className="flex flex-col gap-1.5 min-w-[220px]">
              <Label htmlFor="user">Personel</Label>
              <Select
                id="user"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
              >
                {MOCK_USERS.map((u) => (
                  <option key={u.id} value={u.id}>{u.full_name}</option>
                ))}
              </Select>
            </div>
          </div>

          <CalendarGrid
            year={year}
            month={month}
            entries={entries}
            onDayClick={setAssignDate}
            canAssign
          />
        </CardContent>
      </Card>

      <Modal open={!!assignDate} onClose={closeAssignModal} title="Vardiya Ata">
        {assignDate && (
          <ScheduleForm
            workDate={assignDate}
            shifts={MOCK_SHIFTS}
            onSubmit={handleAssign}
            onCancel={closeAssignModal}
          />
        )}
      </Modal>
    </div>
  );
}
