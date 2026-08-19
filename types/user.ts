import type { Permission, UserRole } from "@/types/auth";

export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
};
