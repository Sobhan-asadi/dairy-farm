"use client";

import { useCart } from "@/components/providers/cart-provider";
import { useCheckout } from "@/components/providers/checkout-provider";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { startCheckout } = useCheckout();

  const handleCheckout = () => {
    startCheckout(items, totalPrice);
    router.push("/checkout");
  };

  return (
    <aside className="bg-card shadow-card rounded-2xl border p-5 lg:sticky lg:top-28">
      <h2 className="text-lg font-bold">خلاصه سفارش</h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">تعداد کالاها</span>
          <span>{totalItems.toLocaleString("fa-IR")}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">مبلغ کالاها</span>
          <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">هزینه ارسال</span>
          <span>در مرحله بعد محاسبه می‌شود</span>
        </div>
      </div>

      <div className="border-border mt-6 flex items-center justify-between border-t pt-5">
        <span className="font-bold">مبلغ فعلی</span>
        <strong className="text-primary text-lg">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </strong>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors"
      >
        ادامه فرایند خرید
        <ArrowLeft className="size-4" />
      </button>

      <button
        type="button"
        onClick={clearCart}
        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors"
      >
        <Trash2 className="size-4" />
        پاک‌کردن سبد خرید
      </button>
    </aside>
  );
}
