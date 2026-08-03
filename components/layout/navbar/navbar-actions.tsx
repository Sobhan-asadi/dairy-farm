/** @format */

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CartLink from "./cart-link";

export default function NavbarActions() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        ورود
      </Link>

      <CartLink />

      <Link href="/products" className={buttonVariants({ variant: "default" })}>
        مشاهده محصولات
      </Link>
    </div>
  );
}
