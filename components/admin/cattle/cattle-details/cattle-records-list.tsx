"use client";

import { useMemo, useState } from "react";

import { PersianDateField } from "@/components/shared/persian-date-field";
import { Button } from "@/components/ui/button";
import type { CattleRecord, CattleRecordType } from "@/types/cattle-record";

import { CattleRecordItem } from "./cattle-record-item";

type CattleRecordsListProps = {
  records: CattleRecord[];
};

type RecordFilter = CattleRecordType | "all";

const recordFilters = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "health",
    label: "سلامت",
  },
  {
    value: "treatment",
    label: "درمان",
  },
  {
    value: "vaccination",
    label: "واکسیناسیون",
  },
  {
    value: "breeding",
    label: "تولیدمثل",
  },
  {
    value: "calving",
    label: "زایش",
  },
  {
    value: "milk-production",
    label: "تولید شیر",
  },
  {
    value: "weight",
    label: "وزن",
  },
] satisfies {
  value: RecordFilter;
  label: string;
}[];

function getRecordTimestamp(date: string) {
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function CattleRecordsList({ records }: CattleRecordsListProps) {
  const [activeFilter, setActiveFilter] = useState<RecordFilter>("all");

  const [dateFilter, setDateFilter] = useState("");

  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => {
        const matchesType =
          activeFilter === "all" || record.type === activeFilter;

        const matchesDate = !dateFilter || record.date === dateFilter;

        return matchesType && matchesDate;
      })
      .sort((a, b) => getRecordTimestamp(b.date) - getRecordTimestamp(a.date));
  }, [records, activeFilter, dateFilter]);

  const hasFilters = activeFilter !== "all" || Boolean(dateFilter);

  const handleResetFilters = () => {
    setActiveFilter("all");
    setDateFilter("");
  };

  return (
    <section className="bg-card overflow-hidden rounded-xl border">
      <div className="border-b p-5 sm:p-6">
        <h2 className="font-semibold">تاریخچه کارتکس</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          سوابق ثبت‌شده برای این دام از جدیدترین به قدیمی‌ترین
        </p>

        {records.length > 0 && (
          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {recordFilters.map((filter) => (
                <Button
                  key={filter.value}
                  type="button"
                  size="sm"
                  variant={
                    activeFilter === filter.value ? "default" : "outline"
                  }
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="w-full sm:max-w-64">
                <p className="mb-2 text-sm font-medium">فیلتر بر اساس تاریخ</p>

                <PersianDateField
                  value={dateFilter}
                  onChange={setDateFilter}
                  placeholder="1405-01-01"
                />
              </div>

              {hasFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResetFilters}
                >
                  پاک کردن فیلترها
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">هنوز سابقه‌ای برای این دام ثبت نشده است</p>

          <p className="text-muted-foreground mt-2 text-sm">
            با افزودن اولین رکورد، تاریخچه کارتکس در این بخش نمایش داده می‌شود.
          </p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">سابقه‌ای با این فیلتر پیدا نشد</p>

          <p className="text-muted-foreground mt-2 text-sm">
            دسته‌بندی یا تاریخ انتخاب‌شده را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {filteredRecords.map((record) => (
            <CattleRecordItem key={record.id} record={record} />
          ))}
        </div>
      )}
    </section>
  );
}
