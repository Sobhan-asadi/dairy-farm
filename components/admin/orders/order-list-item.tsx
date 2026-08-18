import { Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order";

type OrderListItemProps = {
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

export function OrderListItem({ order }: OrderListItemProps) {
  return (
    <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_80px] md:items-center">
      <div className="text-sm font-medium">
        <span className="text-muted-foreground md:hidden">شماره سفارش: </span>

        <span dir="ltr">{order.id}</span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {order.customer.fullName}
        </p>

        <p className="text-muted-foreground mt-1 text-xs" dir="ltr">
          {order.customer.phone}
        </p>
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">مبلغ: </span>
        {order.subtotal.toLocaleString("fa-IR")} تومان
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">روش پرداخت: </span>

        {order.paymentMethod === "online" ? "پرداخت آنلاین" : "واریز و رسید"}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">وضعیت پرداخت: </span>

        {paymentStatusLabels[order.paymentStatus]}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">وضعیت سفارش: </span>

        {orderStatusLabels[order.status]}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">تاریخ: </span>

        {new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(order.createdAt))}
      </div>

      <div className="flex items-center">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={
            <Link
              href={`/admin/orders/${order.id}`}
              aria-label={`مشاهده سفارش ${order.id}`}
            >
              <Eye className="size-4" />
            </Link>
          }
        />
      </div>
    </div>
  );
}
