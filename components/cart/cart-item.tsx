"use client";

import { useCart } from "@/components/providers/cart-provider";
import type { CartItem as CartItemType } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <article className="bg-card rounded-2xl border p-4 sm:p-5">
      <div className="flex gap-4">
        <Link
          href={`/products/${item.slug}`}
          className="relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/products/${item.slug}`}
                className="hover:text-primary font-bold"
              >
                {item.title}
              </Link>

              <p className="text-muted-foreground mt-2 text-xs">
                قیمت هر {item.unit}: {item.price.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              aria-label={`حذف ${item.title} از سبد خرید`}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-muted-foreground text-xs">تعداد</span>

              <div className="mt-2 flex h-10 items-center overflow-hidden rounded-xl border">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  aria-label="افزایش تعداد"
                  className="hover:bg-muted flex size-10 items-center justify-center"
                >
                  <Plus className="size-4" />
                </button>

                <span className="flex min-w-11 items-center justify-center text-sm font-bold">
                  {item.quantity.toLocaleString("fa-IR")}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  aria-label="کاهش تعداد"
                  className="hover:bg-muted flex size-10 items-center justify-center"
                >
                  <Minus className="size-4" />
                </button>
              </div>
            </div>

            <div className="text-left">
              <span className="text-muted-foreground text-xs">جمع محصول</span>

              <p className="text-primary mt-1 font-black">
                {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
