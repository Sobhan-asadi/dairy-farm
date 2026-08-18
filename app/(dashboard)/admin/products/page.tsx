import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { DeleteProductButton } from "@/components/admin/products/delete-product-button";
import { ProductsFilters } from "@/components/admin/products/products-filters";
import { ProductsPagination } from "@/components/admin/products/products-pagination";
import { Button } from "@/components/ui/button";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockProductService } from "@/services/admin/mock-product-service";
import type { ProductAvailability } from "@/services/admin/product-service";
import type { PurchaseType } from "@/types/product";

type AdminProductsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    purchaseType?: string | string[];
    availability?: string | string[];
  }>;
};

const PRODUCTS_PER_PAGE = 5;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isPurchaseType(value: string | undefined): value is PurchaseType {
  return value === "direct" || value === "request";
}

function isAvailability(
  value: string | undefined,
): value is ProductAvailability {
  return value === "all" || value === "available" || value === "unavailable";
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  await requirePermission("manage-products");

  const params = await searchParams;

  const pageParam = getSearchParam(params.page);
  const search = getSearchParam(params.search);
  const purchaseTypeParam = getSearchParam(params.purchaseType);
  const availabilityParam = getSearchParam(params.availability);

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const purchaseType = isPurchaseType(purchaseTypeParam)
    ? purchaseTypeParam
    : "all";

  const availability = isAvailability(availabilityParam)
    ? availabilityParam
    : "all";

  const result = await mockProductService.getProducts({
    page: requestedPage,
    pageSize: PRODUCTS_PER_PAGE,
    search,
    purchaseType,
    availability,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            مدیریت محصولات
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            مشاهده و مدیریت محصولات و خدمات قابل عرضه مجموعه
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/products/new">
              <Plus />
              افزودن محصول
            </Link>
          }
        />
      </div>

      <ProductsFilters />

      <div className="bg-card overflow-hidden rounded-xl border">
        <div className="bg-muted/40 text-muted-foreground hidden grid-cols-[80px_1.5fr_1fr_1fr_1fr_120px] gap-4 border-b px-5 py-3 text-sm font-medium md:grid">
          <span>تصویر</span>
          <span>محصول</span>
          <span>نوع فروش</span>
          <span>موجودی</span>
          <span>وضعیت</span>
          <span>عملیات</span>
        </div>

        {result.items.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium">محصولی پیدا نشد</p>

            <p className="text-muted-foreground mt-2 text-sm">
              عبارت جستجو یا فیلترهای انتخاب‌شده را تغییر دهید.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {result.items.map((product) => (
              <div
                key={product.id}
                className="grid gap-4 p-5 md:grid-cols-[80px_1.5fr_1fr_1fr_1fr_120px] md:items-center"
              >
                <div className="bg-muted relative size-16 overflow-hidden rounded-lg border">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">{product.title}</p>

                  <p className="text-muted-foreground mt-1 truncate text-sm">
                    {product.category}
                  </p>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground md:hidden">
                    نوع فروش:{" "}
                  </span>

                  {product.purchaseType === "direct"
                    ? "خرید مستقیم"
                    : "ثبت درخواست"}
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground md:hidden">
                    موجودی:{" "}
                  </span>

                  {product.purchaseType === "direct" &&
                  typeof product.stock === "number"
                    ? `${product.stock.toLocaleString("fa-IR")} ${product.unit}`
                    : "—"}
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground md:hidden">
                    وضعیت:{" "}
                  </span>

                  {product.isAvailable ? "فعال" : "غیرفعال"}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    nativeButton={false}
                    variant="ghost"
                    size="icon"
                    render={
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        aria-label={`ویرایش ${product.title}`}
                      >
                        <Pencil className="size-4" />
                      </Link>
                    }
                  />

                  <DeleteProductButton
                    productId={product.id}
                    productTitle={product.title}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {result.totalItems.toLocaleString("fa-IR")} محصول
        </p>

        <ProductsPagination
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      </div>
    </div>
  );
}
