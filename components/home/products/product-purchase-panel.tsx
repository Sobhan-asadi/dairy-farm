/** @format */

"use client";

import { useCart } from "@/components/providers/cart-provider";
import type { ProductItem } from "@/types/product";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type ProductPurchasePanelProps = {
  product: ProductItem;
};

export default function ProductPurchasePanel({
  product,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCart();
  const router = useRouter();

  const increaseQuantity = () => {
    const maxQuantity =
      typeof product.stock === "number" ? product.stock : Infinity;

    setQuantity((current) => Math.min(current + 1, maxQuantity));
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
  };
  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!product.isAvailable) {
    return (
      <div className="bg-card rounded-2xl border p-5 sm:p-6">
        <p className="text-destructive font-bold">
          این محصول فعلاً ناموجود است.
        </p>

        <p className="text-muted-foreground mt-2 text-sm leading-7">
          برای اطلاع از موجودشدن محصول، با مجموعه در ارتباط باشید.
        </p>
      </div>
    );
  }

  if (product.purchaseType === "request") {
    return (
      <form
        onSubmit={handleRequestSubmit}
        className="bg-card shadow-card rounded-2xl border p-5 sm:p-6"
      >
        <div>
          <p className="text-sm font-bold">ثبت درخواست خرید</p>

          <p className="text-muted-foreground mt-2 text-sm leading-7">
            قیمت نهایی پس از بررسی مشخصات درخواست و هماهنگی با شما اعلام می‌شود.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {product.requestFields?.quantity && (
            <label className="grid gap-2">
              <span className="text-sm font-medium">
                تعداد موردنیاز ({product.unit})
              </span>

              <input
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                required
                className="border-input bg-background focus:border-ring focus:ring-ring/20 h-11 rounded-xl border px-3 text-sm outline-none focus:ring-3"
              />
            </label>
          )}

          {product.requestFields?.breed && (
            <label className="grid gap-2">
              <span className="text-sm font-medium">نژاد یا نوع موردنظر</span>

              <input
                name="breed"
                type="text"
                placeholder="مثلاً هلشتاین"
                required
                className="border-input bg-background focus:border-ring focus:ring-ring/20 h-11 rounded-xl border px-3 text-sm outline-none focus:ring-3"
              />
            </label>
          )}

          {product.requestFields?.approximateWeight && (
            <label className="grid gap-2">
              <span className="text-sm font-medium">وزن تقریبی</span>

              <input
                name="approximateWeight"
                type="text"
                placeholder="مثلاً ۴۵۰ کیلوگرم"
                className="border-input bg-background focus:border-ring focus:ring-ring/20 h-11 rounded-xl border px-3 text-sm outline-none focus:ring-3"
              />
            </label>
          )}

          {product.requestFields?.description && (
            <label className="grid gap-2">
              <span className="text-sm font-medium">توضیحات درخواست</span>

              <textarea
                name="description"
                rows={4}
                placeholder="جزئیات موردنیاز خود را بنویسید..."
                className="border-input bg-background focus:border-ring focus:ring-ring/20 resize-none rounded-xl border px-3 py-3 text-sm outline-none focus:ring-3"
              />
            </label>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors"
        >
          ثبت درخواست خرید
        </button>

        {submitted && (
          <p
            role="status"
            className="bg-secondary text-secondary-foreground mt-4 rounded-xl px-4 py-3 text-sm"
          >
            درخواست به‌صورت آزمایشی ثبت شد و بعداً به بک‌اند متصل می‌شود.
          </p>
        )}
      </form>
    );
  }

  const totalPrice = (product.price ?? 0) * quantity;

  return (
    <div className="bg-card shadow-card rounded-2xl border p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-muted-foreground text-sm">قیمت هر واحد</span>

          <p className="text-primary mt-1 text-2xl font-black">
            {product.price?.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1.5 text-xs font-semibold">
          هر {product.unit}
        </span>
      </div>

      {typeof product.stock === "number" && (
        <p className="text-muted-foreground mt-3 text-sm">
          موجودی: {product.stock.toLocaleString("fa-IR")} {product.unit}
        </p>
      )}

      <div className="mt-6">
        <span className="text-sm font-medium">تعداد</span>

        <div className="mt-2 flex h-11 w-fit items-center overflow-hidden rounded-xl border">
          <button
            type="button"
            onClick={increaseQuantity}
            disabled={
              typeof product.stock === "number" && quantity >= product.stock
            }
            aria-label="افزایش تعداد"
            className="hover:bg-muted flex size-11 items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>

          <span className="flex min-w-12 items-center justify-center font-bold">
            {quantity.toLocaleString("fa-IR")}
          </span>

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="کاهش تعداد"
            className="hover:bg-muted flex size-11 items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      <div className="border-border mt-6 flex items-center justify-between border-t pt-5">
        <span className="text-muted-foreground text-sm">مبلغ کل</span>

        <strong className="text-lg">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </strong>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors"
      >
        <ShoppingCart className="size-5" />
        افزودن به سبد خرید
      </button>

      {addedToCart && (
        <div
          role="status"
          className="bg-secondary text-secondary-foreground mt-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-bold">محصول به سبد خرید اضافه شد.</p>

          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="bg-primary text-primary-foreground inline-flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-xs font-bold"
          >
            رفتن به سبد خرید
          </button>
        </div>
      )}

      <p className="text-muted-foreground mt-3 text-center text-xs leading-6">
        پذیرش شرایط خرید در مرحله ثبت نهایی سفارش انجام می‌شود.
      </p>
    </div>
  );
}
