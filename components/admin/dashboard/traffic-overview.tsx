"use client";

import { Eye, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DashboardTrafficStats } from "@/types/admin-dashboard";

type TrafficOverviewProps = {
  data: DashboardTrafficStats;
};

const chartConfig = {
  views: {
    label: "بازدید",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TrafficOverview({ data }: TrafficOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>آمار بازدید سایت</CardTitle>

        <CardDescription>
          وضعیت بازدید و کاربران سایت در ۷ روز اخیر
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Eye className="size-4" />
              <span className="text-sm">کل بازدیدها</span>
            </div>

            <p className="mt-3 text-2xl font-bold tabular-nums">
              {data.totalViews.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Users className="size-4" />
              <span className="text-sm">بازدیدکنندگان یکتا</span>
            </div>

            <p className="mt-3 text-2xl font-bold tabular-nums">
              {data.uniqueVisitors.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Eye className="size-4" />
              <span className="text-sm">بازدید امروز</span>
            </div>

            <p className="mt-3 text-2xl font-bold tabular-nums">
              {data.todayViews.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={data.viewsByDay}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) =>
                new Intl.DateTimeFormat("fa-IR", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(`${value}T00:00:00`))
              }
            />

            <YAxis tickLine={false} axisLine={false} width={40} />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(`${value}T00:00:00`))
                  }
                />
              }
            />

            <Area
              dataKey="views"
              type="monotone"
              fill="var(--color-views)"
              fillOpacity={0.15}
              stroke="var(--color-views)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
