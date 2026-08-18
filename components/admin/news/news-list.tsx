import type { NewsItem } from "@/types/news";
import { NewsListItem } from "./news-list-item";

type NewsListProps = {
  news: NewsItem[];
};

export function NewsList({ news }: NewsListProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="bg-muted/40 text-muted-foreground hidden grid-cols-[80px_1.5fr_1fr_1fr_80px] gap-4 border-b px-5 py-3 text-sm font-medium md:grid">
        <span>تصویر</span>
        <span>عنوان</span>
        <span>دسته‌بندی</span>
        <span>تاریخ انتشار</span>
        <span>عملیات</span>
      </div>

      {news.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">خبری پیدا نشد</p>

          <p className="text-muted-foreground mt-2 text-sm">
            عبارت جستجو را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {news.map((item) => (
            <NewsListItem key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
