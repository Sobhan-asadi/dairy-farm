import { OrdersFilters } from "@/components/admin/orders/orders-filters";
import { OrdersList } from "@/components/admin/orders/orders-list";
import { OrdersPagination } from "@/components/admin/orders/orders-pagination";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockOrdersService } from "@/services/admin/mock-orders-service";
import type { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/order";

type AdminOrdersPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    status?: string | string[];
    paymentMethod?: string | string[];
    paymentStatus?: string | string[];
  }>;
};

const ORDERS_PER_PAGE = 5;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isOrderStatus(value: string | undefined): value is OrderStatus {
  return (
    value === "pending" ||
    value === "under-review" ||
    value === "completed" ||
    value === "cancelled"
  );
}

function isPaymentMethod(value: string | undefined): value is PaymentMethod {
  return value === "online" || value === "receipt";
}

function isPaymentStatus(value: string | undefined): value is PaymentStatus {
  return (
    value === "awaiting-payment" ||
    value === "under-review" ||
    value === "paid" ||
    value === "failed"
  );
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  await requirePermission("manage-orders");

  const params = await searchParams;

  const pageParam = getSearchParam(params.page);
  const search = getSearchParam(params.search);
  const statusParam = getSearchParam(params.status);
  const paymentMethodParam = getSearchParam(params.paymentMethod);
  const paymentStatusParam = getSearchParam(params.paymentStatus);

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const status = isOrderStatus(statusParam) ? statusParam : "all";

  const paymentMethod = isPaymentMethod(paymentMethodParam)
    ? paymentMethodParam
    : "all";

  const paymentStatus = isPaymentStatus(paymentStatusParam)
    ? paymentStatusParam
    : "all";

  const result = await mockOrdersService.getOrders({
    page: requestedPage,
    pageSize: ORDERS_PER_PAGE,
    search,
    status,
    paymentMethod,
    paymentStatus,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          مدیریت سفارش‌ها
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          مشاهده، بررسی و مدیریت سفارش‌های ثبت‌شده
        </p>
      </div>

      <OrdersFilters />

      <OrdersList orders={result.items} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {result.totalItems.toLocaleString("fa-IR")} سفارش
        </p>

        <OrdersPagination
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      </div>
    </div>
  );
}
