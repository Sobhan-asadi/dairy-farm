"use client";

import { Cell, Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CattleAnalytics } from "@/services/analytics/analytics-service";

type CattleStatusChartProps = {
  data: CattleAnalytics;
};

const chartConfig = {
  active: {
    label: "فعال",
    color: "var(--chart-1)",
  },
  sold: {
    label: "فروخته‌شده",
    color: "var(--chart-2)",
  },
  dead: {
    label: "تلف‌شده",
    color: "var(--chart-3)",
  },
  removed: {
    label: "حذف از گله",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function CattleStatusChart({ data }: CattleStatusChartProps) {
  const chartData = [
    {
      status: "active",
      label: "فعال",
      value: data.active,
      fill: "var(--color-active)",
    },
    {
      status: "sold",
      label: "فروخته‌شده",
      value: data.sold,
      fill: "var(--color-sold)",
    },
    {
      status: "dead",
      label: "تلف‌شده",
      value: data.dead,
      fill: "var(--color-dead)",
    },
    {
      status: "removed",
      label: "حذف از گله",
      value: data.removed,
      fill: "var(--color-removed)",
    },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="bg-card flex h-full flex-col rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">وضعیت دام‌ها</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          توزیع دام‌های ثبت‌شده بر اساس وضعیت فعلی
        </p>
      </div>

      {total === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <p className="text-muted-foreground text-sm">
            هنوز اطلاعات دامی برای نمایش وجود ندارد.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid flex-1 gap-6 md:grid-cols-[minmax(0,1fr)_190px] md:items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] w-full max-w-[340px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex min-w-32 items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label ?? name}
                        </span>

                        <span className="font-medium">
                          {Number(value).toLocaleString("fa-IR")}
                        </span>
                      </div>
                    )}
                  />
                }
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={68}
                outerRadius={100}
                paddingAngle={2}
                strokeWidth={0}
              >
                {chartData.map((item) => (
                  <Cell key={item.status} fill={item.fill} />
                ))}

                <Label
                  position="center"
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null;
                    }

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString("fa-IR")}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 26}
                          className="fill-muted-foreground text-xs"
                        >
                          کل دام‌ها
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="grid gap-2">
            {chartData.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.fill,
                    }}
                  />

                  <span className="truncate text-sm">{item.label}</span>
                </div>

                <span className="shrink-0 font-medium">
                  {item.value.toLocaleString("fa-IR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
