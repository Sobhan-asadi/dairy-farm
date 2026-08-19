import { Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CareerApplication } from "@/types/career";

type CareerApplicationListItemProps = {
  application: CareerApplication;
};

const statusLabels = {
  new: "جدید",
  reviewing: "در حال بررسی",
  accepted: "پذیرفته‌شده",
  rejected: "ردشده",
} satisfies Record<CareerApplication["status"], string>;

export function CareerApplicationListItem({
  application,
}: CareerApplicationListItemProps) {
  return (
    <div className="grid gap-4 p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_80px] md:items-center">
      <div className="min-w-0">
        <p className="truncate font-medium">{application.fullName}</p>

        {application.email && (
          <p className="text-muted-foreground mt-1 truncate text-xs" dir="ltr">
            {application.email}
          </p>
        )}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">موبایل: </span>

        <span dir="ltr">{application.phone}</span>
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">وضعیت: </span>

        {statusLabels[application.status]}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">تاریخ ثبت: </span>

        {new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(application.createdAt))}
      </div>

      <div className="flex items-center">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={
            <Link
              href={`/admin/careers/${application.id}`}
              aria-label={`مشاهده درخواست ${application.fullName}`}
            >
              <Eye className="size-4" />
            </Link>
          }
        />
      </div>
    </div>
  );
}
