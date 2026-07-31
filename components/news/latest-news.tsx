import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/common/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { latestNews } from "@/constants/news";
import Link from "next/link";
import NewsCard from "./news-card";

export default function LatestNews() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="اخبار و مقالات"
              title="آخرین مطالب دام فاضلی"
              description="تازه‌ترین اخبار، آموزش‌ها و مطالب تخصصی مرتبط با دامداری، سلامت دام و تولید محصولات دامی."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/news"
              className={buttonVariants({ variant: "outline" })}
            >
              مشاهده همه اخبار
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.12}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
