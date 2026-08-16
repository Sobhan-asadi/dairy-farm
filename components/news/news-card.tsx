import type { NewsItem } from "@/types/news";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  news: NewsItem;
};

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="group bg-card shadow-card overflow-hidden rounded-2xl border">
      <Link href={news.href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="bg-secondary text-primary rounded-full px-2.5 py-1 text-xs font-semibold">
              {news.category}
            </span>

            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <CalendarDays className="size-3.5" />
              {news.publishedAt}
            </span>
          </div>

          <h2 className="group-hover:text-primary mt-4 text-lg leading-8 font-bold transition-colors">
            {news.title}
          </h2>

          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-7">
            {news.excerpt}
          </p>

          <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
            ادامه مطلب
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
