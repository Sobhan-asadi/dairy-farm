"use client";

import { useState } from "react";

import { updateCareerApplicationStatusAction } from "@/actions/admin/careers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { CareerApplicationStatus } from "@/types/career";

type ApplicationStatusSelectProps = {
  applicationId: string;
  currentStatus: CareerApplicationStatus;
};

const statusLabels = {
  new: "جدید",
  reviewing: "در حال بررسی",
  accepted: "پذیرفته‌شده",
  rejected: "ردشده",
} satisfies Record<CareerApplicationStatus, string>;

export function ApplicationStatusSelect({
  applicationId,
  currentStatus,
}: ApplicationStatusSelectProps) {
  const [status, setStatus] = useState<CareerApplicationStatus>(currentStatus);

  const [isPending, setIsPending] = useState(false);

  const handleStatusChange = async (nextStatus: CareerApplicationStatus) => {
    if (nextStatus === status) {
      return;
    }

    const previousStatus = status;

    setStatus(nextStatus);
    setIsPending(true);

    try {
      await updateCareerApplicationStatusAction(applicationId, nextStatus);
    } catch {
      setStatus(previousStatus);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={(value) =>
        handleStatusChange(value as CareerApplicationStatus)
      }
      disabled={isPending}
    >
      <SelectTrigger className="w-full sm:w-56">
        {statusLabels[status]}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="new">جدید</SelectItem>

        <SelectItem value="reviewing">در حال بررسی</SelectItem>

        <SelectItem value="accepted">پذیرفته‌شده</SelectItem>

        <SelectItem value="rejected">ردشده</SelectItem>
      </SelectContent>
    </Select>
  );
}
