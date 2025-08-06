export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}