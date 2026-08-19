"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/auth/require-permission";
import type {
  CreateCattleInput,
  CreateCattleRecordInput,
  UpdateCattleInput,
  UpdateCattleRecordInput,
} from "@/services/cattle/cattle-service";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";

export type CattleActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export async function createCattleAction(
  data: CreateCattleInput,
): Promise<CattleActionResult> {
  await requirePermission("manage-kartaks");

  const existingCattle = await mockCattleService.getCattleByTagNumber(
    data.tagNumber,
  );

  if (existingCattle) {
    return {
      success: false,
      message: "دامی با این شماره پلاک قبلاً ثبت شده است.",
    };
  }

  await mockCattleService.createCattle(data);

  revalidatePath("/admin/cattle");

  redirect("/admin/cattle");
}

export async function updateCattleAction(
  id: string,
  data: UpdateCattleInput,
): Promise<CattleActionResult> {
  await requirePermission("manage-kartaks");

  const existingCattle = await mockCattleService.getCattleByTagNumber(
    data.tagNumber ?? "",
  );

  if (existingCattle && existingCattle.id !== id) {
    return {
      success: false,
      message: "دام دیگری با این شماره پلاک ثبت شده است.",
    };
  }

  await mockCattleService.updateCattle(id, data);

  revalidatePath("/admin/cattle");
  revalidatePath(`/admin/cattle/${id}`);

  redirect("/admin/cattle");
}

export async function deleteCattleAction(
  id: string,
): Promise<CattleActionResult> {
  await requirePermission("manage-kartaks");

  const cattle = await mockCattleService.getCattleById(id);

  if (!cattle) {
    return {
      success: false,
      message: "دام موردنظر پیدا نشد.",
    };
  }

  const records = await mockCattleService.getCattleRecords(id);

  if (records.length > 0) {
    return {
      success: false,
      message:
        "این دام دارای سابقه کارتکس است و امکان حذف مستقیم آن وجود ندارد.",
    };
  }

  await mockCattleService.deleteCattle(id);

  revalidatePath("/admin/cattle");

  redirect("/admin/cattle");
}

export async function createCattleRecordAction(
  cattleId: string,
  data: CreateCattleRecordInput,
): Promise<void> {
  await requirePermission("manage-kartaks");

  await mockCattleService.createCattleRecord(cattleId, data);

  revalidatePath(`/admin/cattle/${cattleId}`);

  redirect(`/admin/cattle/${cattleId}`);
}

export async function updateCattleRecordAction(
  cattleId: string,
  recordId: string,
  data: UpdateCattleRecordInput,
): Promise<void> {
  await requirePermission("manage-kartaks");

  await mockCattleService.updateCattleRecord(cattleId, recordId, data);

  revalidatePath(`/admin/cattle/${cattleId}`);

  redirect(`/admin/cattle/${cattleId}`);
}

export async function deleteCattleRecordAction(
  cattleId: string,
  recordId: string,
): Promise<void> {
  await requirePermission("manage-kartaks");

  await mockCattleService.deleteCattleRecord(cattleId, recordId);

  revalidatePath(`/admin/cattle/${cattleId}`);
}
