import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import Link from "next/link";

export default function ProductsHero() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <nav className="text-muted-foreground flex items-center gap-2 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              صفحه اصلی
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page" className="text-foreground">
              محصولات
            </span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <span className="text-primary text-sm font-semibold">
              محصولات دام فاضلی
            </span>

            <h1 className="mt-3 text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
              انتخابی مطمئن برای خرید محصولات دامی
            </h1>

            <p className="text-muted-foreground mt-5 max-w-2xl leading-8">
              مجموعه‌ای از دام و محصولات دامی با تمرکز بر سلامت، کیفیت و تأمین
              مطمئن.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
