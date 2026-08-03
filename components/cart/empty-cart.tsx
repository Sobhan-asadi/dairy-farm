import { buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="bg-card mx-auto flex max-w-xl flex-col items-center rounded-3xl border px-6 py-14 text-center">
      <span className="bg-secondary text-primary flex size-16 items-center justify-center rounded-2xl">
        <ShoppingCart className="size-8" />
      </span>

      <h1 className="mt-6 text-2xl font-black sm:text-3xl">
        سبد خرید شما خالی است
      </h1>

      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-7">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید. برای مشاهده محصولات وارد
        فروشگاه شوید.
      </p>

      <Link
        href="/products"
        className={buttonVariants({
          size: "lg",
          className: "mt-7",
        })}
      >
        مشاهده فروشگاه
      </Link>
    </div>
  );
}
