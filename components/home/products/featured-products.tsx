import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/common/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { featuredProducts } from "@/constants/products";
import Link from "next/link";
import ProductCard from "./product-card";

export default function FeaturedProducts() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="محصولات منتخب"
              title="محصولات باکیفیت دام فاضلی"
              description="بخشی از محصولات و دام‌های مجموعه که با تمرکز بر سلامت، کیفیت و تأمین مطمئن عرضه می‌شوند."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              مشاهده همه محصولات
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.12}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
