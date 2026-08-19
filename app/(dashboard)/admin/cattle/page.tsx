import { Plus } from "lucide-react";
import Link from "next/link";

import { CattleFilters } from "@/components/admin/cattle/cattle-filters";
import { CattleList } from "@/components/admin/cattle/cattle-list";
import { CattlePagination } from "@/components/admin/cattle/cattle-pagination";
import { Button } from "@/components/ui/button";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";
import type { CattleStatus } from "@/types/cattle";

type AdminCattlePageProps = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    status?: string | string[];
  }>;
};

const CATTLE_PER_PAGE = 10;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isCattleStatus(value: string | undefined): value is CattleStatus {
  return (
    value === "active" ||
    value === "sold" ||
    value === "dead" ||
    value === "removed"
  );
}

export default async function AdminCattlePage({
  searchParams,
}: AdminCattlePageProps) {
  await requirePermission("manage-kartaks");

  const params = await searchParams;

  const pageParam = getSearchParam(params.page);
  const search = getSearchParam(params.search);
  const statusParam = getSearchParam(params.status);

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const status = isCattleStatus(statusParam) ? statusParam : "all";

  const result = await mockCattleService.getCattle({
    page: requestedPage,
    pageSize: CATTLE_PER_PAGE,
    search,
    status,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            مدیریت دام‌ها
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            ثبت دام، جستجو با شماره پلاک و دسترسی به کارتکس دام‌ها
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/cattle/new">
              <Plus />
              ثبت دام جدید
            </Link>
          }
        />
      </div>

      <CattleFilters />

      <CattleList cattle={result.items} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {result.totalItems.toLocaleString("fa-IR")} دام
        </p>

        <CattlePagination
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      </div>
    </div>
  );
}
