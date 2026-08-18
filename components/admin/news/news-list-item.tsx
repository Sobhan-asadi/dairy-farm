import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { DeleteNewsButton } from "@/components/admin/news/delete-news-button";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/types/news";

type NewsListItemProps = {
  news: NewsItem;
};

export function NewsListItem({ news }: NewsListItemProps) {
  return (
    <div className="grid gap-4 p-5 md:grid-cols-[80px_1.5fr_1fr_1fr_100px] md:items-center">
      <div className="bg-muted relative size-16 overflow-hidden rounded-lg border">
        <Image
          src={news.image}
          alt={news.title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="font-medium">{news.title}</p>

        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {news.excerpt}
        </p>
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">دسته‌بندی: </span>

        {news.category}
      </div>

      <div className="text-sm">
        <span className="text-muted-foreground md:hidden">تاریخ انتشار: </span>

        {news.publishedAt || "—"}
      </div>

      <div className="flex items-center gap-1">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={
            <Link
              href={`/admin/news/${news.id}/edit`}
              aria-label={`ویرایش ${news.title}`}
            >
              <Pencil className="size-4" />
            </Link>
          }
        />

        <DeleteNewsButton newsId={news.id} newsTitle={news.title} />
      </div>
    </div>
  );
}
