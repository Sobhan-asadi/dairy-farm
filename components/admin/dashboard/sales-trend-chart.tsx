"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import type { DashboardSalesPoint } from "@/types/admin-dashboard";

type SalesTrendChartProps = {
  data: DashboardSalesPoint[];
};

const chartConfig = {
  orders: {
    label: "تعداد سفارش",
    color: "var(--chart-2)",
  },
  revenue: {
    label: "مبلغ فروش",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>روند سفارش‌ها و فروش</CardTitle>
        <CardDescription>عملکرد فروش در ۷ روز اخیر</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <LineChart
            accessibilityLayer
            data={data}
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

            <YAxis
              yAxisId="orders"
              tickLine={false}
              axisLine={false}
              width={30}
            />

            <YAxis
              yAxisId="revenue"
              orientation="right"
              tickLine={false}
              axisLine={false}
              width={55}
              tickFormatter={(value: number) =>
                `${(value / 1_000_000).toLocaleString("fa-IR")}م`
              }
            />

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

            <Line
              yAxisId="orders"
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="revenue"
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
