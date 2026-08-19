import { AnalyticsSummaryCards } from "@/components/admin/analytics/analytics-summary-cards";
import { CattleStatusChart } from "@/components/admin/analytics/cattle-status-chart";
import { MonthlySalesChart } from "@/components/admin/analytics/monthly-sales-chart";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockAnalyticsService } from "@/services/analytics/mock-analytics-service";

export default async function AnalyticsPage() {
  await requirePermission("view-analytics");

  const [summary, monthlySales, cattleAnalytics] = await Promise.all([
    mockAnalyticsService.getSummary(),
    mockAnalyticsService.getMonthlySales(),
    mockAnalyticsService.getCattleAnalytics(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          آمار و گزارش‌ها
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          نمای کلی از وضعیت فروش، کاربران، محصولات و دام‌ها
        </p>
      </div>

      <AnalyticsSummaryCards summary={summary} />

      <div className="grid gap-6 xl:grid-cols-2">
        <MonthlySalesChart data={monthlySales} />

        <CattleStatusChart data={cattleAnalytics} />
      </div>
    </div>
  );
}
