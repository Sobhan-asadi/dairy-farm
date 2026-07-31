import type { NewsItem } from "@/constants/news";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  item: NewsItem;
};

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="group bg-card hover:shadow-soft overflow-hidden rounded-2xl border transition-shadow duration-300">
      <Link href={item.href} className="block">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <span className="bg-background/90 text-primary absolute top-4 right-4 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
            {item.category}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <CalendarDays className="size-4" />
            <time>{item.publishedAt}</time>
          </div>

          <h3 className="mt-4 line-clamp-2 text-lg leading-8 font-bold">
            {item.title}
          </h3>

          <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-7">
            {item.excerpt}
          </p>

          <span className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            ادامه مطلب
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
