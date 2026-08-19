import type { CareerApplication } from "@/types/career";
import { CareerApplicationListItem } from "./career-application-list-item";

type CareerApplicationsListProps = {
  applications: CareerApplication[];
};

export function CareerApplicationsList({
  applications,
}: CareerApplicationsListProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="bg-muted/40 text-muted-foreground hidden grid-cols-[1.4fr_1fr_1fr_1fr_80px] gap-4 border-b px-5 py-3 text-sm font-medium md:grid">
        <span>متقاضی</span>
        <span>شماره موبایل</span>
        <span>وضعیت</span>
        <span>تاریخ ثبت</span>
        <span>عملیات</span>
      </div>

      {applications.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">درخواست همکاری پیدا نشد</p>

          <p className="text-muted-foreground mt-2 text-sm">
            عبارت جستجو یا فیلتر وضعیت را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {applications.map((application) => (
            <CareerApplicationListItem
              key={application.id}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  );
}
