import { NewsForm } from "@/components/admin/news/news-form/news-form";
import { requirePermission } from "@/lib/auth/require-permission";

export default async function NewNewsPage() {
  await requirePermission("manage-news");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          ایجاد خبر جدید
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          اطلاعات خبر جدید را وارد کنید.
        </p>
      </div>

      <NewsForm />
    </div>
  );
}
