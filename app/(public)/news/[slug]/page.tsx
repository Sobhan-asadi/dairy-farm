import Container from "@/components/common/container";
import { latestNews } from "@/constants/news";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getNewsBySlug(slug: string) {
  return latestNews.find((news) => news.href === `/news/${slug}`);
}

export function generateStaticParams() {
  return latestNews.map((news) => ({
    slug: news.href.split("/").at(-1)!,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return {
      title: "خبر یافت نشد | دامداری",
    };
  }

  return {
    title: `${news.title} | دامداری`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            href="/news"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowRight className="size-4" />
            بازگشت به اخبار
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-secondary text-primary rounded-full px-3 py-1 text-xs font-semibold">
                {news.category}
              </span>

              <time className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <CalendarDays className="size-4" />
                {news.publishedAt}
              </time>
            </div>

            <h1 className="mt-5 text-3xl leading-tight font-black sm:text-4xl lg:text-5xl">
              {news.title}
            </h1>

            <p className="text-muted-foreground mt-5 text-base leading-8 sm:text-lg">
              {news.excerpt}
            </p>
          </header>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={news.image}
              alt={news.title}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground leading-8">
              متن کامل این خبر پس از اتصال به بخش مدیریت اخبار و Backend از
              اطلاعات واقعی خبر دریافت و در این قسمت نمایش داده خواهد شد.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
