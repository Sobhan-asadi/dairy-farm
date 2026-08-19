import { CareerApplicationsFilters } from "@/components/admin/careers/career-applications-filters";
import { CareerApplicationsList } from "@/components/admin/careers/career-applications-list";
import { CareerApplicationsPagination } from "@/components/admin/careers/career-applications-pagination";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCareerService } from "@/services/careers/api-career-service";
import type { CareerApplicationStatus } from "@/types/career";

type AdminCareersPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    status?: string | string[];
  }>;
};

const APPLICATIONS_PER_PAGE = 5;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isCareerApplicationStatus(
  value: string | undefined,
): value is CareerApplicationStatus {
  return (
    value === "new" ||
    value === "reviewing" ||
    value === "accepted" ||
    value === "rejected"
  );
}

export default async function AdminCareersPage({
  searchParams,
}: AdminCareersPageProps) {
  await requirePermission("manage-careers");

  const params = await searchParams;

  const pageParam = getSearchParam(params.page);
  const search = getSearchParam(params.search);
  const statusParam = getSearchParam(params.status);

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const status = isCareerApplicationStatus(statusParam) ? statusParam : "all";

  const result = await mockCareerService.getApplications({
    page: requestedPage,
    pageSize: APPLICATIONS_PER_PAGE,
    search,
    status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          مدیریت درخواست‌های همکاری
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          مشاهده و بررسی درخواست‌های همکاری ارسال‌شده
        </p>
      </div>

      <CareerApplicationsFilters />

      <CareerApplicationsList applications={result.items} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {result.totalItems.toLocaleString("fa-IR")} درخواست
        </p>

        <CareerApplicationsPagination
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      </div>
    </div>
  );
}
