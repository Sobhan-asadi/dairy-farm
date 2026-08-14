import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { hasPermission } from "@/lib/auth/permissions";
import type { Permission } from "@/types/auth";

export async function requirePermission(permission: Permission) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasPermission(user, permission)) {
    redirect("/");
  }

  return user;
}
