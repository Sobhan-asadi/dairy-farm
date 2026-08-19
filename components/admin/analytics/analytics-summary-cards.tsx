import {
  Beef,
  BriefcaseBusiness,
  Newspaper,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { AnalyticsSummary } from "@/services/analytics/analytics-service";

type AnalyticsSummaryCardsProps = {
  summary: AnalyticsSummary;
};

type SummaryCard = {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export function AnalyticsSummaryCards({ summary }: AnalyticsSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      label: "کاربران",
      value: summary.totalUsers,
      description: "کل کاربران ثبت‌شده",
      icon: Users,
    },
    {
      label: "سفارش‌ها",
      value: summary.totalOrders,
      description: "کل سفارش‌های ثبت‌شده",
      icon: ShoppingCart,
    },
    {
      label: "محصولات",
      value: summary.totalProducts,
      description: "محصولات موجود در سیستم",
      icon: Package,
    },
    {
      label: "دام‌ها",
      value: summary.totalCattle,
      description: "کل دام‌های ثبت‌شده",
      icon: Beef,
    },
    {
      label: "درخواست‌های همکاری",
      value: summary.totalCareers,
      description: "کل درخواست‌های دریافت‌شده",
      icon: BriefcaseBusiness,
    },
    {
      label: "اخبار",
      value: summary.totalNews,
      description: "اخبار ثبت‌شده در سایت",
      icon: Newspaper,
    },
  ];

  return (
    <section
      aria-label="خلاصه آمار"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.label} className="bg-card rounded-xl border p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm">{card.label}</p>

                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {card.value.toLocaleString("fa-IR")}
                </p>
              </div>

              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </div>
            </div>

            <p className="text-muted-foreground mt-4 text-xs">
              {card.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
