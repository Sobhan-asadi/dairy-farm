import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import CtaSection from "@/components/cta/home-cta";
import ProductPurchasePanel from "@/components/home/products/product-purchase-panel";
import ScrollToPurchaseButton from "@/components/home/products/scroll-to-purchase-button";
import { products } from "@/constants/products";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* معرفی اولیه صفحه */}
      <section className="bg-surface-muted border-b py-8 sm:py-12 lg:py-16">
        <Container>
          <Reveal>
            <nav
              aria-label="مسیر صفحه"
              className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs sm:text-sm"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                صفحه اصلی
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                فروشگاه
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page" className="text-foreground">
                {product.title}
              </span>
            </nav>

            <div className="mt-6 max-w-3xl">
              <span className="bg-secondary text-primary inline-flex rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm">
                {product.category}
              </span>

              <h1 className="mt-4 text-3xl leading-tight font-black sm:text-5xl lg:text-6xl">
                {product.title}
              </h1>

              <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8">
                {product.description}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* نسخه موبایل: تصویر و خلاصه خرید کنار هم */}
      <section className="py-6 md:hidden">
        <Container>
          <Reveal>
            <div className="bg-card shadow-card overflow-hidden rounded-3xl border">
              <div className="grid grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-56">
                  <Image
                    src={product.cover}
                    alt={product.title}
                    fill
                    priority
                    sizes="45vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="flex min-w-0 flex-col justify-center p-4">
                  <span className="text-muted-foreground text-xs">
                    {product.category}
                  </span>

                  <h2 className="mt-2 line-clamp-2 text-lg leading-7 font-black">
                    {product.title}
                  </h2>

                  <div className="mt-3">
                    {!product.isAvailable ? (
                      <span className="text-destructive text-sm font-bold">
                        فعلاً ناموجود
                      </span>
                    ) : product.purchaseType === "direct" ? (
                      <>
                        <strong className="text-primary block text-lg font-black">
                          {product.price?.toLocaleString("fa-IR")} تومان
                        </strong>

                        <span className="text-muted-foreground mt-1 block text-xs">
                          هر {product.unit}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary text-sm leading-6 font-bold">
                        نیازمند استعلام قیمت
                      </span>
                    )}
                  </div>

                  <ScrollToPurchaseButton
                    label={
                      product.purchaseType === "direct"
                        ? "انتخاب تعداد و خرید"
                        : "ثبت درخواست خرید"
                    }
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div id="purchase-panel" className="scroll-mt-24 pt-5">
              <ProductPurchasePanel product={product} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* نسخه تبلت و دسکتاپ */}
      <section className="hidden py-12 md:block lg:py-16">
        <Container>
          <div className="grid items-start gap-8 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <Reveal>
              <div className="shadow-soft relative aspect-4/3 overflow-hidden rounded-3xl border">
                <Image
                  src={product.cover}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 52vw, 55vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

                <span className="bg-background/90 text-primary absolute right-5 bottom-5 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-md">
                  {product.category}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="md:sticky md:top-24 lg:top-28">
                <ProductPurchasePanel product={product} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* توضیحات و ویژگی‌ها */}
      <section className="bg-surface-muted py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
            <Reveal>
              <div>
                <span className="text-primary text-sm font-semibold">
                  معرفی محصول
                </span>

                <h2 className="mt-3 text-3xl leading-tight font-black sm:text-4xl">
                  محصولی سالم و قابل اعتماد
                </h2>

                <div className="text-muted-foreground mt-6 space-y-5 text-sm leading-8 sm:text-base">
                  {product.longDescription.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-card shadow-card rounded-2xl border p-5 sm:p-6">
                <h2 className="text-lg font-bold">ویژگی‌های محصول</h2>

                <ul className="mt-5 space-y-4">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />

                      <span className="text-sm leading-7 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
