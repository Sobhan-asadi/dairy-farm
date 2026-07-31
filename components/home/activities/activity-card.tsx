import type { ActivityItem } from "@/constants/activities";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ActivityCardProps = {
  activity: ActivityItem;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const Icon = activity.icon;

  return (
    <Link
      href={activity.href}
      className="group bg-card hover:shadow-soft flex min-h-56 flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 sm:min-h-64 sm:p-6"
    >
      <span className="bg-secondary text-primary flex size-12 items-center justify-center rounded-xl">
        <Icon className="size-6" />
      </span>

      <h3 className="mt-6 text-lg font-bold">{activity.title}</h3>

      <p className="text-muted-foreground mt-3 text-sm leading-7">
        {activity.description}
      </p>

      <span className="text-primary mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
        مشاهده جزئیات
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}
