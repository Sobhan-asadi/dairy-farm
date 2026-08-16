import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="bg-secondary text-primary mx-auto flex size-16 items-center justify-center rounded-2xl">
          <SearchX className="size-7" aria-hidden="true" />
        </div>

        <p className="text-primary mt-6 text-sm font-bold">خطای ۴۰۴</p>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          صفحه موردنظر پیدا نشد
        </h1>

        <p className="text-muted-foreground mx-auto mt-4 max-w-md leading-8">
          ممکن است آدرس صفحه تغییر کرده باشد، صفحه حذف شده باشد یا نشانی واردشده
          صحیح نباشد.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              className: "gap-2",
            })}
          >
            <Home className="size-4" aria-hidden="true" />
            صفحه اصلی
          </Link>

          <Link
            href="/products"
            className={buttonVariants({
              variant: "outline",
              className: "gap-2",
            })}
          >
            مشاهده محصولات
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
