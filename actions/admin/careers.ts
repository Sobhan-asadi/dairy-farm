"use server";

import { requirePermission } from "@/lib/auth/require-permission";
import { mockCareerService } from "@/services/careers/api-career-service";
import type { CareerApplicationStatus } from "@/types/career";
import { revalidatePath } from "next/cache";

export async function updateCareerApplicationStatusAction(
  applicationId: string,
  status: CareerApplicationStatus,
): Promise<void> {
  await requirePermission("manage-careers");

  await mockCareerService.updateApplicationStatus(applicationId, status);

  revalidatePath("/admin/careers");
  revalidatePath(`/admin/careers/${applicationId}`);
}
