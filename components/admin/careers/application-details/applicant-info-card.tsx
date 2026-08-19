import type { CareerApplication } from "@/types/career";

type ApplicantInfoCardProps = {
  application: CareerApplication;
};

export function ApplicantInfoCard({ application }: ApplicantInfoCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">اطلاعات متقاضی</h2>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">نام و نام خانوادگی</span>

          <span className="font-medium">{application.fullName}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">شماره موبایل</span>

          <span dir="ltr" className="font-medium">
            {application.phone}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">ایمیل</span>

          {application.email ? (
            <span dir="ltr" className="font-medium">
              {application.email}
            </span>
          ) : (
            <span className="text-muted-foreground">ثبت نشده</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">تاریخ ثبت درخواست</span>

          <span className="font-medium">
            {new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(application.createdAt))}
          </span>
        </div>
      </div>
    </section>
  );
}
