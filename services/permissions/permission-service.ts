import type { Permission } from "@/types/auth";
import type { User } from "@/types/user";

export type PermissionUser = Pick<
  User,
  "id" | "fullName" | "email" | "role" | "status" | "permissions"
>;

export type UpdateUserPermissionsInput = {
  permissions: Permission[];
};

export interface PermissionService {
  getPermissionUsers(): Promise<PermissionUser[]>;

  getPermissionUserById(id: string): Promise<PermissionUser | null>;

  updateUserPermissions(
    id: string,
    data: UpdateUserPermissionsInput,
  ): Promise<PermissionUser>;
}
