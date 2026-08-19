"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { requirePermission } from "@/lib/auth/require-permission";
import { UpdateUserPermissionsSchema } from "@/lib/validations/permission";
import { mockPermissionService } from "@/services/permissions/mock-permission-service";
import type { UpdateUserPermissionsInput } from "@/services/permissions/permission-service";

export type UpdatePermissionsActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function updateUserPermissionsAction(
  userId: string,
  data: UpdateUserPermissionsInput,
): Promise<UpdatePermissionsActionResult> {
  await requirePermission("manage-permissions");

  const validationResult = UpdateUserPermissionsSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "اطلاعات دسترسی‌ها معتبر نیست.",
    };
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "نشست کاربری معتبر نیست.",
    };
  }

  const user = await mockPermissionService.getPermissionUserById(userId);

  if (!user) {
    return {
      success: false,
      message: "کاربر موردنظر پیدا نشد.",
    };
  }

  if (user.role === "manager") {
    return {
      success: false,
      message: "دسترسی‌های مدیر مجموعه قابل تغییر نیست.",
    };
  }

  const isEditingOwnPermissions = currentUser.id === userId;

  const removesOwnPermissionManagement =
    isEditingOwnPermissions &&
    !validationResult.data.permissions.includes("manage-permissions");

  if (removesOwnPermissionManagement) {
    return {
      success: false,
      message: "نمی‌توانید دسترسی مدیریت دسترسی‌ها را از حساب خودتان حذف کنید.",
    };
  }

  await mockPermissionService.updateUserPermissions(
    userId,
    validationResult.data,
  );

  revalidatePath("/admin/permissions");
  revalidatePath(`/admin/permissions/${userId}`);

  redirect("/admin/permissions");
}
