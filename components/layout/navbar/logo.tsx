/** @format */

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="صفحه اصلی دام فاضلی"
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-300 group-hover:-rotate-3">
        ف
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-foreground text-base font-bold sm:text-lg">
          دام فاضلی
        </span>

        <span className="text-muted-foreground mt-1 hidden text-[10px] font-medium tracking-[0.08em] sm:block">
          FAZELI LIVESTOCK
        </span>
      </span>
    </Link>
  );
}
