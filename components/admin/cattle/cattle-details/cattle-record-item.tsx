import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPersianDate } from "@/lib/date/format-persian-date";
import type { CattleRecord } from "@/types/cattle-record";

import { DeleteCattleRecordButton } from "./delete-cattle-record-button";

type CattleRecordItemProps = {
  record: CattleRecord;
};

const recordTypeLabels = {
  health: "سلامت",
  treatment: "درمان",
  vaccination: "واکسیناسیون",
  breeding: "تولیدمثل",
  calving: "زایش",
  "milk-production": "تولید شیر",
  weight: "وزن",
} satisfies Record<CattleRecord["type"], string>;

export function CattleRecordItem({ record }: CattleRecordItemProps) {
  return (
    <article className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-medium">{recordTypeLabels[record.type]}</p>

          <p className="text-muted-foreground mt-1 text-sm">
            {formatPersianDate(record.date)}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <RecordDetails record={record} />

          <div className="flex items-center gap-1">
            <Button
              nativeButton={false}
              variant="ghost"
              size="icon"
              render={
                <Link
                  href={`/admin/cattle/${record.cattleId}/records/${record.id}/edit`}
                  aria-label="ویرایش سابقه"
                >
                  <Pencil className="size-4" />
                </Link>
              }
            />

            <DeleteCattleRecordButton
              cattleId={record.cattleId}
              recordId={record.id}
            />
          </div>
        </div>
      </div>

      {record.notes && (
        <p className="text-muted-foreground mt-4 text-sm leading-7">
          {record.notes}
        </p>
      )}
    </article>
  );
}

function RecordDetails({ record }: { record: CattleRecord }) {
  switch (record.type) {
    case "health":
      return (
        <div className="text-sm">
          <p>{record.condition}</p>

          {record.symptoms && (
            <p className="text-muted-foreground mt-1">
              علائم: {record.symptoms}
            </p>
          )}
        </div>
      );

    case "treatment":
      return (
        <div className="text-sm">
          <p>{record.diagnosis}</p>

          {record.medication && (
            <p className="text-muted-foreground mt-1">
              دارو: {record.medication}
            </p>
          )}

          {record.dosage && (
            <p className="text-muted-foreground mt-1">دوز: {record.dosage}</p>
          )}

          {record.veterinarian && (
            <p className="text-muted-foreground mt-1">
              دامپزشک: {record.veterinarian}
            </p>
          )}
        </div>
      );

    case "vaccination":
      return (
        <div className="text-sm">
          <p>{record.vaccineName}</p>

          {record.dose && (
            <p className="text-muted-foreground mt-1">دوز: {record.dose}</p>
          )}

          {record.nextDoseDate && (
            <p className="text-muted-foreground mt-1">
              نوبت بعدی: {formatPersianDate(record.nextDoseDate)}
            </p>
          )}
        </div>
      );

    case "breeding":
      return (
        <div className="text-sm">
          <p>
            {record.method === "natural" ? "جفت‌گیری طبیعی" : "تلقیح مصنوعی"}
          </p>

          <p className="text-muted-foreground mt-1">
            نتیجه:{" "}
            {record.result === "pregnant"
              ? "آبستن"
              : record.result === "not-pregnant"
                ? "آبستن نشده"
                : "در انتظار بررسی"}
          </p>
        </div>
      );

    case "calving":
      return (
        <div className="text-sm">
          <p>تعداد گوساله: {record.calfCount.toLocaleString("fa-IR")}</p>

          <p className="text-muted-foreground mt-1">
            زنده: {record.liveCalfCount.toLocaleString("fa-IR")}
          </p>

          {record.complications && (
            <p className="text-muted-foreground mt-1">
              عوارض: {record.complications}
            </p>
          )}
        </div>
      );

    case "milk-production":
      return (
        <p className="text-sm font-medium">
          {record.amountLiters.toLocaleString("fa-IR")} لیتر
        </p>
      );

    case "weight":
      return (
        <p className="text-sm font-medium">
          {record.weightKg.toLocaleString("fa-IR")} کیلوگرم
        </p>
      );
  }
}
