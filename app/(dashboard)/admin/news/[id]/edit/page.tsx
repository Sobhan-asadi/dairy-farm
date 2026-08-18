import { notFound } from "next/navigation";

import { NewsForm } from "@/components/admin/news/news-form/news-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockNewsService } from "@/services/admin/mock-news-service";

type EditNewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  await requirePermission("manage-news");

  const { id } = await params;

  const newsId = Number.parseInt(id, 10);

  if (!Number.isInteger(newsId) || newsId < 1) {
    notFound();
  }

  const news = await mockNewsService.getNewsById(newsId);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ویرایش خبر</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          اطلاعات «{news.title}» را ویرایش کنید.
        </p>
      </div>

      <NewsForm news={news} />
    </div>
  );
}
