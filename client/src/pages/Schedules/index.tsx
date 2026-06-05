import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCalendar, useCreateSchedule, useUsers } from "@/features/schedules/hooks";
import { useShifts } from "@/features/shifts/hooks";
import { CalendarGrid } from "@/features/schedules/CalendarGrid";
import { ScheduleForm } from "@/features/schedules/ScheduleForm";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const currentDate = new Date();

export default function SchedulesPage() {
  const { user, isAdmin } = useAuth();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(
    user?.id ?? null
  );
  const [assignDate, setAssignDate] = useState<string | null>(null);

  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: shifts } = useShifts();
  const { data: entries, isLoading: calendarLoading } = useCalendar(
    year,
    month,
    selectedUserId
  );
  const createSchedule = useCreateSchedule();

  const yearOptions = useMemo(() => {
    const y = currentDate.getFullYear();
    return [y - 1, y, y + 1];
  }, []);

  const closeAssignModal = () => setAssignDate(null);

  const handleAssign = (values: { shift_code: string; note?: string }) => {
    if (!assignDate || !selectedUserId) return;
    createSchedule.mutate(
      {
        userId: selectedUserId,
        work_date: assignDate,
        shift_code: values.shift_code,
        note: values.note,
      },
      { onSuccess: closeAssignModal }
    );
  };

  const canAssign = isAdmin;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">Puantaj Takvimi</h1>
        <p className="text-sm text-stone-500 mt-1">
          Aylık vardiya planını görüntüleyin
          {canAssign && " ve atama yapın"}
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
                  <option key={y} value={y}>
                    {y}
                  </option>
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
                  <option key={name} value={i + 1}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            {isAdmin && (
              <div className="flex flex-col gap-1.5 min-w-[220px]">
                <Label htmlFor="user">Personel</Label>
                {usersLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Select
                    id="user"
                    value={selectedUserId ?? ""}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                  >
                    <option value="">Personel seçin</option>
                    {users?.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.full_name}
                      </option>
                    ))}
                  </Select>
                )}
              </div>
            )}
          </div>

          {calendarLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !selectedUserId ? (
            <p className="text-center text-sm text-stone-500 py-16">
              Takvimi görüntülemek için personel seçin.
            </p>
          ) : (
            <CalendarGrid
              year={year}
              month={month}
              entries={entries ?? []}
              onDayClick={setAssignDate}
              canAssign={canAssign}
            />
          )}
        </CardContent>
      </Card>

      <Modal
        open={!!assignDate}
        onClose={closeAssignModal}
        title="Vardiya Ata"
      >
        {assignDate && (
          <ScheduleForm
            workDate={assignDate}
            shifts={shifts ?? []}
            onSubmit={handleAssign}
            onCancel={closeAssignModal}
            isLoading={createSchedule.isPending}
          />
        )}
      </Modal>
    </div>
  );
}
