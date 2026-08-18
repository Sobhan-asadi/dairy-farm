"use client";

import { useState } from "react";

import { updateOrderStatusAction } from "@/actions/admin/orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { OrderStatus } from "@/types/order";

type OrderStatusSelectProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

const orderStatusLabels = {
  pending: "در انتظار بررسی",
  "under-review": "در حال بررسی",
  completed: "تکمیل‌شده",
  cancelled: "لغوشده",
} satisfies Record<OrderStatus, string>;

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isPending, setIsPending] = useState(false);

  const handleStatusChange = async (nextStatus: OrderStatus) => {
    if (nextStatus === status) {
      return;
    }

    const previousStatus = status;

    setStatus(nextStatus);
    setIsPending(true);

    try {
      await updateOrderStatusAction(orderId, nextStatus);
    } catch {
      setStatus(previousStatus);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={(value) => handleStatusChange(value as OrderStatus)}
      disabled={isPending}
    >
      <SelectTrigger className="w-full sm:w-56">
        {orderStatusLabels[status]}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="pending">در انتظار بررسی</SelectItem>

        <SelectItem value="under-review">در حال بررسی</SelectItem>

        <SelectItem value="completed">تکمیل‌شده</SelectItem>

        <SelectItem value="cancelled">لغوشده</SelectItem>
      </SelectContent>
    </Select>
  );
}
