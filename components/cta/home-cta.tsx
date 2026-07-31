import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function HomeCta() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div
              aria-hidden="true"
              className="bg-accent/20 absolute -top-20 -left-20 size-64 rounded-full blur-3xl"
            />

            <div
              aria-hidden="true"
              className="bg-primary-foreground/10 absolute -right-20 -bottom-24 size-72 rounded-full blur-3xl"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-accent text-sm font-semibold">
                  شروع همکاری با دام فاضلی
                </span>

                <h2 className="mt-3 text-3xl leading-tight font-black sm:text-4xl">
                  برای خرید دام و محصولات دامی آماده‌اید؟
                </h2>

                <p className="text-primary-foreground/70 mt-4 leading-8">
                  محصولات مجموعه را مشاهده کنید یا برای دریافت اطلاعات، مشاوره و
                  هماهنگی خرید با ما در ارتباط باشید.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto",
                  )}
                >
                  مشاهده محصولات
                  <ArrowLeft />
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full bg-transparent sm:w-auto",
                  )}
                >
                  <PhoneCall />
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
