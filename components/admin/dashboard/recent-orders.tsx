import type { Order } from "@/types/order";

type RecentOrdersProps = {
  orders: Order[];
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

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="bg-card rounded-xl border">
      <div className="border-b p-5">
        <h2 className="font-semibold">آخرین سفارش‌ها</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          آخرین سفارش‌های ثبت‌شده در سیستم
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-muted-foreground px-5 py-10 text-center text-sm">
          هنوز سفارشی ثبت نشده است.
        </div>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium">{order.customer.fullName}</p>

                <p className="text-muted-foreground mt-1 text-xs" dir="ltr">
                  {order.id}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                <span className="text-muted-foreground text-sm">
                  سفارش: {orderStatusLabels[order.status]}
                </span>

                <span className="text-muted-foreground text-sm">
                  پرداخت: {paymentStatusLabels[order.paymentStatus]}
                </span>

                <strong className="text-sm whitespace-nowrap">
                  {order.subtotal.toLocaleString("fa-IR")} تومان
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
