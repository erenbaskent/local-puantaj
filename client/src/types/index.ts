export interface Notification {
  message: string;
  type: "success" | "error" | "info";
}

export interface ApiResponse<T> {
  data: T;
  ok?: boolean;
  message?: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role_code: string;
  role: { code: string; name: string } | null;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  expiresIn: string;
  user: AuthUser;
}

export interface Shift {
  id: number;
  name: string;
  code: string;
  start_time: string;
  end_time: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalendarEntry {
  id: number;
  userId: number;
  full_name: string;
  psnno: string;
  work_date: string;
  shift_code: string;
  shift_name: string;
  shift_start: string;
  shift_end: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarResponse {
  ok: boolean;
  meta: { year: number; month: number; count: number };
  data: CalendarEntry[];
}

export interface User {
  id: number;
  psnno: string;
  identity_number: string;
  full_name: string;
  username: string;
  email: string;
  role_code: string;
  title: string | null;
  unit: string | null;
  status: boolean;
  login_count: number;
  last_login: string | null;
  last_logout: string | null;
  createdAt?: string;
  updatedAt?: string;
}
