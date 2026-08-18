"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/require-permission";
import { mockOrdersService } from "@/services/admin/mock-orders-service";
import type { OrderStatus, PaymentStatus } from "@/types/order";

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  await requirePermission("manage-orders");

  await mockOrdersService.updateOrderStatus(orderId, status);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function updatePaymentStatusAction(
  orderId: string,
  paymentStatus: PaymentStatus,
): Promise<void> {
  await requirePermission("manage-orders");

  await mockOrdersService.updatePaymentStatus(orderId, paymentStatus);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
