/** @format */

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function NavbarActions() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        ورود
      </Link>

      <Link
        href="/cart"
        aria-label="سبد خرید"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <ShoppingCart />
      </Link>

      <Link href="/products" className={buttonVariants({ variant: "default" })}>
        مشاهده محصولات
      </Link>
    </div>
  );
}
