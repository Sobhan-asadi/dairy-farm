"use client";

import { useState } from "react";

import { updatePaymentStatusAction } from "@/actions/admin/orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { PaymentStatus } from "@/types/order";

type PaymentStatusSelectProps = {
  orderId: string;
  currentStatus: PaymentStatus;
};

const paymentStatusLabels = {
  "awaiting-payment": "در انتظار پرداخت",
  "under-review": "در حال بررسی",
  paid: "پرداخت‌شده",
  failed: "ناموفق",
} satisfies Record<PaymentStatus, string>;

export function PaymentStatusSelect({
  orderId,
  currentStatus,
}: PaymentStatusSelectProps) {
  const [status, setStatus] = useState<PaymentStatus>(currentStatus);
  const [isPending, setIsPending] = useState(false);

  const handleStatusChange = async (nextStatus: PaymentStatus) => {
    if (nextStatus === status) {
      return;
    }

    const previousStatus = status;

    setStatus(nextStatus);
    setIsPending(true);

    try {
      await updatePaymentStatusAction(orderId, nextStatus);
    } catch {
      setStatus(previousStatus);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={(value) => handleStatusChange(value as PaymentStatus)}
      disabled={isPending}
    >
      <SelectTrigger className="w-full sm:w-56">
        {paymentStatusLabels[status]}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="awaiting-payment">در انتظار پرداخت</SelectItem>

        <SelectItem value="under-review">در حال بررسی</SelectItem>

        <SelectItem value="paid">پرداخت‌شده</SelectItem>

        <SelectItem value="failed">ناموفق</SelectItem>
      </SelectContent>
    </Select>
  );
}
