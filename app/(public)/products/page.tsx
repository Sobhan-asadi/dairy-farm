/** @format */

import CtaSection from "@/components/cta/home-cta";
import ProductsGrid from "@/components/home/products/products-grid";
import ProductsHero from "@/components/home/products/products-hero";

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
      <CtaSection />
    </>
  );
}
