import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardStatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

export function DashboardStatCard({
  title,
  value,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-4" />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold tabular-nums">
          {value.toLocaleString("fa-IR")}
        </p>
      </CardContent>
    </Card>
  );
}
