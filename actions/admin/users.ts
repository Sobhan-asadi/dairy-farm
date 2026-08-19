"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/auth/require-permission";
import { mockUserService } from "@/services/users/mock-user-service";
import type { UpdateUserInput } from "@/services/users/user-service";

export type UpdateUserActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function updateUserAction(
  id: string,
  data: UpdateUserInput,
): Promise<UpdateUserActionResult> {
  await requirePermission("manage-users");

  const existingUser = await mockUserService.getUserById(id);

  if (!existingUser) {
    return {
      success: false,
      message: "کاربر موردنظر پیدا نشد.",
    };
  }

  if (existingUser.role === "manager") {
    if (data.role !== "manager") {
      return {
        success: false,
        message: "امکان تغییر نقش مدیر مجموعه وجود ندارد.",
      };
    }

    if (data.status !== "active") {
      return {
        success: false,
        message: "امکان غیرفعال کردن مدیر مجموعه وجود ندارد.",
      };
    }
  }

  await mockUserService.updateUser(id, data);

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}/edit`);

  redirect("/admin/users");
}
