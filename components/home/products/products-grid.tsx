import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import ProductCard from "@/components/home/products/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { products } from "@/constants/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 6;

type ProductsGridProps = {
  currentPage: number;
};

export default function ProductsGrid({ currentPage }: ProductsGridProps) {
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;

  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent className="bg-card shadow-card flex items-center gap-5 rounded-2xl border px-5 py-1">
                <PaginationItem>
                  <PaginationLink
                    href={
                      hasPreviousPage
                        ? `/products?page=${safeCurrentPage - 1}`
                        : "#"
                    }
                    aria-disabled={!hasPreviousPage}
                    className={
                      !hasPreviousPage
                        ? "text-muted-foreground pointer-events-none h-9 gap-1 rounded-xl px-3 opacity-40"
                        : "hover:bg-muted h-9 gap-1 rounded-xl px-3"
                    }
                  >
                    <ChevronRight className="size-3" />
                    <span>قبلی</span>
                  </PaginationLink>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isActive = page === safeCurrentPage;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`/products?page=${page}`}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground size-9 rounded-xl border-transparent font-bold"
                            : "hover:bg-muted size-10 rounded-xl border-transparent"
                        }
                      >
                        {page.toLocaleString("fa-IR")}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationLink
                    href={
                      hasNextPage
                        ? `/products?page=${safeCurrentPage + 1}`
                        : "#"
                    }
                    aria-disabled={!hasNextPage}
                    className={
                      !hasNextPage
                        ? "text-muted-foreground pointer-events-none h-9 gap-1 rounded-xl px-3 opacity-40"
                        : "hover:bg-muted h-9 gap-1 rounded-xl px-3"
                    }
                  >
                    <span>بعدی</span>
                    <ChevronLeft className="size-3" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Container>
    </section>
  );
}
