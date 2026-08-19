import type { CareerApplication } from "@/types/career";

type ApplicationMessageCardProps = {
  message: CareerApplication["message"];
};

export function ApplicationMessageCard({
  message,
}: ApplicationMessageCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">توضیحات متقاضی</h2>

      {message ? (
        <p className="mt-5 text-sm leading-7 whitespace-pre-line">{message}</p>
      ) : (
        <p className="text-muted-foreground mt-5 text-sm">
          متقاضی توضیحی ثبت نکرده است.
        </p>
      )}
    </section>
  );
}
