"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MonthlySalesPoint } from "@/services/analytics/analytics-service";

type MonthlySalesChartProps = {
  data: MonthlySalesPoint[];
};

const chartConfig = {
  revenue: {
    label: "فروش",
    color: "var(--chart-1)",
  },
  orders: {
    label: "تعداد سفارش",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function formatRevenueAxis(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString("fa-IR")}م`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toLocaleString("fa-IR")}ه`;
  }

  return value.toLocaleString("fa-IR");
}

export function MonthlySalesChart({ data }: MonthlySalesChartProps) {
  return (
    <section className="bg-card flex h-full flex-col rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">فروش ماهانه</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          مقایسه مبلغ فروش و تعداد سفارش‌ها به تفکیک ماه
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <p className="text-muted-foreground text-sm">
            هنوز اطلاعات فروشی برای نمایش وجود ندارد.
          </p>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="mt-6 h-[340px] w-full">
          <ComposedChart
            accessibilityLayer
            data={data}
            margin={{
              top: 16,
              right: 8,
              left: 8,
              bottom: 4,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />

            <YAxis
              yAxisId="revenue"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={54}
              tickFormatter={(value) => formatRevenueAxis(Number(value))}
            />

            <YAxis
              yAxisId="orders"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={28}
              allowDecimals={false}
            />

            <ChartTooltip
              cursor={{
                fill: "var(--muted)",
                opacity: 0.35,
              }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <div className="flex min-w-40 items-center justify-between gap-4">
                          <span className="text-muted-foreground">فروش</span>

                          <span className="font-medium">
                            {Number(value).toLocaleString("fa-IR")} تومان
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div className="flex min-w-40 items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          تعداد سفارش
                        </span>

                        <span className="font-medium">
                          {Number(value).toLocaleString("fa-IR")}
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />

            <Bar
              yAxisId="revenue"
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[6, 6, 0, 0]}
              maxBarSize={56}
            />

            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              stroke="var(--color-orders)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--color-orders)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </ComposedChart>
        </ChartContainer>
      )}
    </section>
  );
}
