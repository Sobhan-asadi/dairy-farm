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
  const { lastOrder } = useCheckout();

  useEffect(() => {
    if (!lastOrder) {
      router.replace("/products");
      return;
    }

    clearCart();
  }, [lastOrder, clearCart, router]);

  if (!lastOrder) {
    return null;
  }

  return (
    <section className="mx-auto max-w-2xl text-center">
      <div className="bg-card rounded-3xl border p-6 sm:p-10">
        <span className="bg-secondary text-primary mx-auto flex size-16 items-center justify-center rounded-2xl">
          <CheckCircle2 className="size-8" />
        </span>

        <h1 className="mt-6 text-3xl font-black sm:text-4xl">
          سفارش با موفقیت ثبت شد
        </h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          اطلاعات سفارش شما ثبت شد و پس از بررسی، وضعیت آن به‌روزرسانی خواهد شد.
        </p>

        <div className="bg-surface-muted mt-8 rounded-2xl p-5 text-right">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">شماره سفارش</span>

            <strong dir="ltr">{lastOrder.orderId}</strong>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">روش پرداخت</span>

            <strong className="text-sm">
              {lastOrder.paymentMethod === "online"
                ? "پرداخت آنلاین"
                : "بارگذاری رسید"}
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
