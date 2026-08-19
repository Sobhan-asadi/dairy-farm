import type { Permission } from "@/types/auth";
import type { User } from "@/types/user";

export type UserListParams = {
  page: number;
  pageSize: number;
  search?: string;
  role?: User["role"] | "all";
  status?: User["status"] | "all";
};

export type PaginatedUsers = {
  items: User[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type UpdateUserInput = Pick<
  User,
  "fullName" | "email" | "role" | "status"
>;

export interface UserService {
  getUsers(params: UserListParams): Promise<PaginatedUsers>;

  getUserById(id: string): Promise<User | null>;

  updateUser(id: string, data: UpdateUserInput): Promise<User>;

  updateUserPermissions(id: string, permissions: Permission[]): Promise<User>;
}
