import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import CtaSection from "@/components/cta/home-cta";
import { activities } from "@/constants/activities";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ActivityDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}
export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { slug } = await params;

  const activity = activities.find((item) => item.slug === slug);

  if (!activity) {
    notFound();
  }

  const Icon = activity.icon;

  return (
    <>
      <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
        <Container>
          <Reveal>
            <nav
              aria-label="مسیر صفحه"
              className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                صفحه اصلی
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                href="/activities"
                className="hover:text-primary transition-colors"
              >
                فعالیت‌ها
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page" className="text-foreground">
                {activity.title}
              </span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <span className="bg-secondary text-primary flex size-12 items-center justify-center rounded-xl">
                <Icon className="size-6" />
              </span>

              <h1 className="mt-5 text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
                {activity.title}
              </h1>

              <p className="text-muted-foreground mt-5 max-w-2xl leading-8">
                {activity.description}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-18 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                <Image
                  src={activity.cover}
                  alt={activity.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <span className="text-primary text-sm font-semibold">
                  معرفی خدمت
                </span>

                <h2 className="mt-3 text-3xl leading-tight font-black sm:text-4xl">
                  خدمات تخصصی و قابل اعتماد
                </h2>

                <div className="text-muted-foreground mt-6 space-y-5 leading-8">
                  {activity.longDescription.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ul className="mt-8 space-y-4">
                  {activity.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="text-primary size-5 shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
