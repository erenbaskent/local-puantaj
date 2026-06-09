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
