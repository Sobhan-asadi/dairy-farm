import type { CattleRecord } from "@/types/cattle-record";

type CattleSummaryProps = {
  records: CattleRecord[];
};

function getRecordTimestamp(date: string) {
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function CattleSummary({ records }: CattleSummaryProps) {
  const latestWeight = records
    .filter((record) => record.type === "weight")
    .sort((a, b) => getRecordTimestamp(b.date) - getRecordTimestamp(a.date))[0];

  const latestMilkProduction = records
    .filter((record) => record.type === "milk-production")
    .sort((a, b) => getRecordTimestamp(b.date) - getRecordTimestamp(a.date))[0];

  const healthRecordsCount = records.filter(
    (record) =>
      record.type === "health" ||
      record.type === "treatment" ||
      record.type === "vaccination",
  ).length;

  return (
    <section
      aria-label="خلاصه کارتکس"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <div className="bg-card rounded-xl border p-5">
        <p className="text-muted-foreground text-sm">تعداد سوابق</p>

        <p className="mt-2 text-2xl font-semibold">
          {records.length.toLocaleString("fa-IR")}
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5">
        <p className="text-muted-foreground text-sm">آخرین وزن</p>

        <p className="mt-2 text-2xl font-semibold">
          {latestWeight
            ? `${latestWeight.weightKg.toLocaleString("fa-IR")} کیلوگرم`
            : "—"}
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5">
        <p className="text-muted-foreground text-sm">آخرین تولید شیر</p>

        <p className="mt-2 text-2xl font-semibold">
          {latestMilkProduction
            ? `${latestMilkProduction.amountLiters.toLocaleString("fa-IR")} لیتر`
            : "—"}
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5">
        <p className="text-muted-foreground text-sm">سوابق سلامت</p>

        <p className="mt-2 text-2xl font-semibold">
          {healthRecordsCount.toLocaleString("fa-IR")}
        </p>
      </div>
    </section>
  );
}
