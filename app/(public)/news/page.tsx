import Container from "@/components/common/container";
import NewsCard from "@/components/news/news-card";
import { latestNews } from "@/constants/news";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اخبار | دامداری",
  description:
    "آخرین اخبار، مطالب آموزشی و تازه‌های مجموعه در حوزه دامداری، سلامت دام و تولید محصولات.",
};

export default async function NewsPage() {
  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <span className="text-primary text-sm font-semibold">
            اخبار و مطالب
          </span>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            تازه‌های مجموعه
          </h1>

          <p className="text-muted-foreground mt-4 leading-8">
            آخرین اخبار و مطالب مرتبط با سلامت دام، پرورش و تولید محصولات
            دامداری را دنبال کنید.
          </p>
        </header>

        <section
          aria-label="آخرین اخبار"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </section>
      </Container>
    </div>
  );
}
