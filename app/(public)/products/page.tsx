import CtaSection from "@/components/cta/home-cta";
import ProductsGrid from "@/components/home/products/products-grid";
import ProductsHero from "@/components/home/products/products-hero";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page } = await searchParams;

  const pageValue = Array.isArray(page) ? page[0] : page;

  const parsedPage = Number.parseInt(pageValue ?? "1", 10);

  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <>
      <ProductsHero />

      <ProductsGrid currentPage={currentPage} />

      <CtaSection />
    </>
  );
}
