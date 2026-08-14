"use client";

import { useCart } from "@/components/providers/cart-provider";
import { useCheckout } from "@/components/providers/checkout-provider";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const router = useRouter();

  const { clearCart } = useCart();
  const { completedOrder } = useCheckout();

  useEffect(() => {
    if (!completedOrder) {
      router.replace("/products");
      return;
    }

    clearCart();
  }, [completedOrder, clearCart, router]);

  if (!completedOrder) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="bg-card rounded-3xl border p-6 sm:p-10">
        <div className="text-center">
          <span className="bg-secondary text-primary mx-auto flex size-16 items-center justify-center rounded-2xl">
            <CheckCircle2 className="size-8" />
          </span>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            سفارش با موفقیت ثبت شد
          </h1>

          <p className="text-muted-foreground mt-3 text-sm leading-7">
            اطلاعات سفارش شما ثبت شد و پس از بررسی، وضعیت آن به‌روزرسانی خواهد
            شد.
          </p>
        </div>

        <div className="bg-surface-muted mt-8 rounded-2xl p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">شماره سفارش</span>

            <strong dir="ltr">{completedOrder.id}</strong>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">روش پرداخت</span>

            <strong className="text-sm">
              {completedOrder.paymentMethod === "online"
                ? "پرداخت آنلاین"
                : "بارگذاری رسید"}
            </strong>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">وضعیت سفارش</span>

            <strong className="text-sm">در انتظار بررسی</strong>
          </div>

          <div className="border-border mt-5 border-t pt-5">
            <span className="text-muted-foreground text-sm">محصولات سفارش</span>

            <div className="mt-4 space-y-3">
              {completedOrder.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>

                    <p className="text-muted-foreground mt-1 text-xs">
                      {item.quantity.toLocaleString("fa-IR")} {item.unit}
                    </p>
                  </div>

                  <strong>
                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="border-border mt-5 flex items-center justify-between border-t pt-5">
            <span className="font-bold">مبلغ سفارش</span>

            <strong className="text-primary text-lg">
              {completedOrder.subtotal.toLocaleString("fa-IR")} تومان
            </strong>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-bold transition-colors"
          >
            بازگشت به فروشگاه
          </Link>

          <Link
            href="/"
            className="border-border hover:bg-muted inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-bold transition-colors"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
