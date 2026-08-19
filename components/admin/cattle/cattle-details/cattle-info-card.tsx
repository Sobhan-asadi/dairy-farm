import { formatPersianDate } from "@/lib/date/format-persian-date";
import type { Cattle } from "@/types/cattle";

type CattleInfoCardProps = {
  cattle: Cattle;
};

const genderLabels = {
  female: "ماده",
  male: "نر",
} satisfies Record<Cattle["gender"], string>;

const statusLabels = {
  active: "فعال",
  sold: "فروخته‌شده",
  dead: "تلف‌شده",
  removed: "حذف از گله",
} satisfies Record<Cattle["status"], string>;

export function CattleInfoCard({ cattle }: CattleInfoCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">مشخصات دام</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          اطلاعات شناسایی و پایه ثبت‌شده برای این دام
        </p>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="text-muted-foreground text-sm">شماره پلاک</dt>

          <dd className="mt-1 font-medium">
            <bdi>{cattle.tagNumber}</bdi>
          </dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">نام دام</dt>

          <dd className="mt-1 font-medium">{cattle.name || "ثبت نشده"}</dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">نژاد</dt>

          <dd className="mt-1 font-medium">{cattle.breed}</dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">جنسیت</dt>

          <dd className="mt-1 font-medium">{genderLabels[cattle.gender]}</dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">وضعیت</dt>

          <dd className="mt-1 font-medium">{statusLabels[cattle.status]}</dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">تاریخ تولد</dt>

          <dd className="mt-1 font-medium">
            {formatPersianDate(cattle.birthDate)}
          </dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">تاریخ ورود</dt>

          <dd className="mt-1 font-medium">
            {formatPersianDate(cattle.entryDate)}
          </dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">پلاک مادر</dt>

          <dd className="mt-1 font-medium">
            {cattle.motherTagNumber ? (
              <bdi>{cattle.motherTagNumber}</bdi>
            ) : (
              "ثبت نشده"
            )}
          </dd>
        </div>

        <div>
          <dt className="text-muted-foreground text-sm">پلاک پدر</dt>

          <dd className="mt-1 font-medium">
            {cattle.fatherTagNumber ? (
              <bdi>{cattle.fatherTagNumber}</bdi>
            ) : (
              "ثبت نشده"
            )}
          </dd>
        </div>
      </dl>

      {cattle.notes && (
        <div className="mt-6 border-t pt-5">
          <p className="text-muted-foreground text-sm">یادداشت داخلی</p>

          <p className="mt-2 text-sm leading-7">{cattle.notes}</p>
        </div>
      )}
    </section>
  );
}
