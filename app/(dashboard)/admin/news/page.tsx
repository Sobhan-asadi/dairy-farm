import { Plus } from "lucide-react";
import Link from "next/link";

import { NewsList } from "@/components/admin/news/news-list";
import { NewsPagination } from "@/components/admin/news/news-pagination";
import { NewsSearch } from "@/components/admin/news/news-search";
import { Button } from "@/components/ui/button";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockNewsService } from "@/services/admin/mock-news-service";

type AdminNewsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
  }>;
};

const NEWS_PER_PAGE = 5;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminNewsPage({
  searchParams,
}: AdminNewsPageProps) {
  await requirePermission("manage-news");

  const params = await searchParams;

  const pageParam = getSearchParam(params.page);
  const search = getSearchParam(params.search);

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const result = await mockNewsService.getNews({
    page: requestedPage,
    pageSize: NEWS_PER_PAGE,
    search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            مدیریت اخبار
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            مشاهده و مدیریت اخبار منتشرشده مجموعه
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/admin/news/new">
              <Plus />
              افزودن خبر
            </Link>
          }
        />
      </div>

      <NewsSearch />

      <NewsList news={result.items} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {result.totalItems.toLocaleString("fa-IR")} خبر
        </p>

        <NewsPagination
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      </div>
    </div>
  );
}
