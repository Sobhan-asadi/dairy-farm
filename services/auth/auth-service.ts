import type { AuthResult, LoginCredentials, RegisterData } from "@/types/auth";

export interface AuthService {
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}
