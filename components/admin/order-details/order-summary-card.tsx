import type { Order } from "@/types/order";

type OrderSummaryCardProps = {
  order: Order;
};

const orderStatusLabels = {
  pending: "در انتظار بررسی",
  "under-review": "در حال بررسی",
  completed: "تکمیل‌شده",
  cancelled: "لغوشده",
} satisfies Record<Order["status"], string>;

const paymentStatusLabels = {
  "awaiting-payment": "در انتظار پرداخت",
  "under-review": "در حال بررسی",
  paid: "پرداخت‌شده",
  failed: "ناموفق",
} satisfies Record<Order["paymentStatus"], string>;

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">اطلاعات سفارش</h2>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">وضعیت سفارش</span>

          <span className="font-medium">{orderStatusLabels[order.status]}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">وضعیت پرداخت</span>

          <span className="font-medium">
            {paymentStatusLabels[order.paymentStatus]}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">روش پرداخت</span>

          <span className="font-medium">
            {order.paymentMethod === "online"
              ? "پرداخت آنلاین"
              : "واریز و رسید"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">مبلغ سفارش</span>

          <span className="font-medium">
            {order.subtotal.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">تاریخ ثبت</span>

          <span className="font-medium">
            {new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(order.createdAt))}
          </span>
        </div>
      </div>
    </section>
  );
}
