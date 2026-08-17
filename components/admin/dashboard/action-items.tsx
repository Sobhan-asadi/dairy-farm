import { BriefcaseBusiness, ShoppingCart } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardActionItem } from "@/types/admin-dashboard";

type ActionItemsProps = {
  items: DashboardActionItem[];
};

const actionItemIcons = {
  order: ShoppingCart,
  career: BriefcaseBusiness,
} satisfies Record<DashboardActionItem["type"], typeof ShoppingCart>;

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>نیازمند اقدام</CardTitle>

        <CardDescription>
          مواردی که نیاز به بررسی و پیگیری دارند
        </CardDescription>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            موردی برای بررسی وجود ندارد.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = actionItemIcons[item.type];

              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-4 transition-colors"
                >
                  <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>

                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
