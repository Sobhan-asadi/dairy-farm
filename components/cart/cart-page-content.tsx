"use client";

import Container from "@/components/common/container";
import { useCart } from "@/components/providers/cart-provider";

import CartItem from "./cart-item";
import CartSummary from "./cart-summary";
import EmptyCart from "./empty-cart";

export default function CartPageContent() {
  const { items } = useCart();

  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="mb-8">
              <span className="text-primary text-sm font-semibold">
                سبد خرید
              </span>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                محصولات انتخاب‌شده
              </h1>

              <p className="text-muted-foreground mt-3 text-sm leading-7">
                تعداد کالاها را بررسی کنید و سپس وارد مرحله ثبت سفارش شوید.
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>

              <CartSummary />
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
