import type { Order } from "@/types/order";
import { OrderListItem } from "./order-list-item";

type OrdersListProps = {
  orders: Order[];
};

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="bg-muted/40 text-muted-foreground hidden grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_80px] gap-4 border-b px-5 py-3 text-sm font-medium md:grid">
        <span>شماره سفارش</span>
        <span>مشتری</span>
        <span>مبلغ</span>
        <span>روش پرداخت</span>
        <span>وضعیت پرداخت</span>
        <span>وضعیت سفارش</span>
        <span>تاریخ</span>
        <span>عملیات</span>
      </div>

      {orders.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">سفارشی پیدا نشد</p>

          <p className="text-muted-foreground mt-2 text-sm">
            عبارت جستجو یا فیلترهای انتخاب‌شده را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
