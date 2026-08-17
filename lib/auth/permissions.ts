import type { AuthUser, Permission } from "@/types/auth";

export function hasPermission(user: AuthUser, permission: Permission) {
  if (user.role === "manager") {
    return true;
  }

  return user.permissions.includes(permission);
}

export function hasAnyPermission(user: AuthUser, permissions: Permission[]) {
  if (user.role === "manager") {
    return true;
  }

  return permissions.some((permission) =>
    user.permissions.includes(permission),
  );
}

export function hasAllPermissions(user: AuthUser, permissions: Permission[]) {
  if (user.role === "manager") {
    return true;
  }

  return permissions.every((permission) =>
    user.permissions.includes(permission),
  );
}
