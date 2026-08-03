import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import Link from "next/link";

export default function ActivitiesHero() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <nav
            aria-label="مسیر صفحه"
            className="text-muted-foreground flex items-center gap-2 text-sm"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              صفحه اصلی
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page" className="text-foreground">
              فعالیت‌ها
            </span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <span className="text-primary text-sm font-semibold">
              فعالیت‌های مجموعه
            </span>

            <h1 className="mt-3 text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
              خدماتی کامل برای زنجیره دامداری
            </h1>

            <p className="text-muted-foreground mt-5 max-w-2xl leading-8">
              دام فاضلی در زمینه پرورش، سلامت، تأمین و عرضه محصولات مرتبط با
              دامداری فعالیت می‌کند.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
