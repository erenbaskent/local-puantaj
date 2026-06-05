export interface MockShift {
  id: number;
  name: string;
  code: string;
  start_time: string;
  end_time: string;
}

export interface MockUser {
  id: number;
  full_name: string;
}

export interface MockCalendarEntry {
  work_date: string;
  shift_code: string;
  shift_start: string;
  shift_end: string;
  note?: string;
}

export const MOCK_CURRENT_USER = {
  full_name: "Ahmet Yılmaz",
  role_code: "ADMIN",
};

export const MOCK_SHIFTS: MockShift[] = [
  { id: 1, name: "Gündüz", code: "GUNDUZ", start_time: "08:00:00", end_time: "17:00:00" },
  { id: 2, name: "Gece", code: "GECE", start_time: "22:00:00", end_time: "06:00:00" },
  { id: 3, name: "Esnek", code: "ESNEK", start_time: "09:00:00", end_time: "18:00:00" },
];

export const MOCK_USERS: MockUser[] = [
  { id: 1, full_name: "Ahmet Yılmaz" },
  { id: 2, full_name: "Ayşe Demir" },
  { id: 3, full_name: "Mehmet Kaya" },
];

export const MOCK_CALENDAR_ENTRIES: MockCalendarEntry[] = [
  { work_date: "2026-06-02", shift_code: "GUNDUZ", shift_start: "08:00:00", shift_end: "17:00:00" },
  { work_date: "2026-06-03", shift_code: "GUNDUZ", shift_start: "08:00:00", shift_end: "17:00:00", note: "Toplantı" },
  { work_date: "2026-06-05", shift_code: "GECE", shift_start: "22:00:00", shift_end: "06:00:00" },
  { work_date: "2026-06-10", shift_code: "ESNEK", shift_start: "09:00:00", shift_end: "18:00:00" },
  { work_date: "2026-06-12", shift_code: "GUNDUZ", shift_start: "08:00:00", shift_end: "17:00:00" },
];
