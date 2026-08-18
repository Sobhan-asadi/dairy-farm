import Image from "next/image";

import type { Order } from "@/types/order";

type OrderItemsCardProps = {
  items: Order["items"];
};

export function OrderItemsCard({ items }: OrderItemsCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">محصولات سفارش</h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground mt-5 text-sm">
          محصولی برای این سفارش ثبت نشده است.
        </p>
      ) : (
        <div className="mt-5 divide-y">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center"
            >
              <div className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-lg border">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.title}</p>

                <p className="text-muted-foreground mt-1 text-sm">
                  قیمت واحد: {item.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">تعداد: </span>

                <span className="font-medium">
                  {item.quantity.toLocaleString("fa-IR")} {item.unit}
                </span>
              </div>

              <div className="sm:min-w-40 sm:text-left">
                <p className="text-muted-foreground text-xs">جمع</p>

                <p className="mt-1 font-semibold">
                  {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
