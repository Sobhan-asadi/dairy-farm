import { Eye, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Cattle } from "@/types/cattle";

type CattleListItemProps = {
  cattle: Cattle;
};

const statusLabels = {
  active: "فعال",
  sold: "فروخته‌شده",
  dead: "تلف‌شده",
  removed: "حذف از گله",
} satisfies Record<Cattle["status"], string>;

const genderLabels = {
  female: "ماده",
  male: "نر",
} satisfies Record<Cattle["gender"], string>;

export function CattleListItem({ cattle }: CattleListItemProps) {
  return (
    <div className="grid gap-4 p-5 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_100px] md:items-center">
      <div className="min-w-0">
        <p className="font-medium">
          <bdi>{cattle.tagNumber}</bdi>
        </p>

        {cattle.name && (
          <p className="text-muted-foreground mt-1 text-xs">{cattle.name}</p>
        )}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">نژاد: </span>

        {cattle.breed}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">جنسیت: </span>

        {genderLabels[cattle.gender]}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">وضعیت: </span>

        {statusLabels[cattle.status]}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">تاریخ ورود: </span>

        {new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(cattle.entryDate))}
      </div>

      <div className="flex items-center gap-1">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={
            <Link
              href={`/admin/cattle/${cattle.id}`}
              aria-label={`مشاهده کارتکس دام ${cattle.tagNumber}`}
            >
              <Eye className="size-4" />
            </Link>
          }
        />

        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={
            <Link
              href={`/admin/cattle/${cattle.id}/edit`}
              aria-label={`ویرایش دام ${cattle.tagNumber}`}
            >
              <Pencil className="size-4" />
            </Link>
          }
        />
      </div>
    </div>
  );
}
