import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <div className="bg-primary text-primary-foreground rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
            <h2 className="text-3xl font-black sm:text-4xl">
              برای آشنایی بیشتر با محصولات و خدمات ما
            </h2>

            <p className="text-primary-foreground/70 mx-auto mt-4 max-w-2xl leading-8">
              محصولات مجموعه را مشاهده کنید یا برای دریافت اطلاعات بیشتر با ما
              در ارتباط باشید.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/products" className={buttonVariants({ size: "lg" })}>
                مشاهده محصولات
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
