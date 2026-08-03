"use client";

import { useCart } from "@/components/providers/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

type CartLinkProps = {
  className?: string;
};

export default function CartLink({ className }: CartLinkProps) {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`سبد خرید، ${totalItems.toLocaleString("fa-IR")} کالا`}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "icon",
        }),
        "relative",
        className,
      )}
    >
      <ShoppingCart className="size-5" />

      {totalItems > 0 && (
        <span className="bg-destructive text-destructive-foreground absolute -top-1 -left-1 flex min-w-5 items-center justify-center rounded-full px-1 text-[10px] leading-5 font-bold">
          {totalItems > 99 ? "+۹۹" : totalItems.toLocaleString("fa-IR")}
        </span>
      )}
    </Link>
  );
}
