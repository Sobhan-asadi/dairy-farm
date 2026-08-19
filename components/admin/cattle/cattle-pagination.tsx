"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type CattlePaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export function CattlePagination({
  currentPage,
  totalPages,
}: CattlePaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    return `/admin/cattle?${params.toString()}`;
  };

  return (
    <Pagination className="mx-0 w-auto justify-start sm:justify-end">
      <PaginationContent className="gap-1 rounded-xl border p-1.5">
        <PaginationItem>
          <PaginationPrevious
            href={createPageHref(Math.max(currentPage - 1, 1))}
            text="قبلی"
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
            className={
              currentPage === 1 ? "pointer-events-none opacity-40" : undefined
            }
          />
        </PaginationItem>

        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageHref(page)}
                isActive={page === currentPage}
              >
                {page.toLocaleString("fa-IR")}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={createPageHref(Math.min(currentPage + 1, totalPages))}
            text="بعدی"
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
