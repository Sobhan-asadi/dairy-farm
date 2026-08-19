import { mockUserService } from "@/services/users/mock-user-service";

import type { PermissionService, PermissionUser } from "./permission-service";

function toPermissionUser(
  user: Awaited<ReturnType<typeof mockUserService.getUserById>>,
): PermissionUser | null {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
    permissions: user.permissions,
  };
}

export const mockPermissionService: PermissionService = {
  async getPermissionUsers() {
    const result = await mockUserService.getUsers({
      page: 1,
      pageSize: 100,
      role: "all",
      status: "all",
    });

    return result.items.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions,
    }));
  },

  async getPermissionUserById(id) {
    const user = await mockUserService.getUserById(id);

    return toPermissionUser(user);
  },

  async updateUserPermissions(id, data) {
    const user = await mockUserService.getUserById(id);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    if (user.role === "manager") {
      throw new Error("دسترسی‌های مدیر مجموعه قابل تغییر نیست.");
    }

    const updatedUser = await mockUserService.updateUserPermissions(
      id,
      data.permissions,
    );

    const permissionUser = toPermissionUser(updatedUser);

    if (!permissionUser) {
      throw new Error("کاربر پیدا نشد.");
    }

    return permissionUser;
  },
};
