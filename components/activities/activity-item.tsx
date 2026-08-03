import type { ActivityItem as ActivityItemType } from "@/types/activity";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ActivityItemProps = {
  activity: ActivityItemType;
};

export default function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = activity.icon;

  return (
    <article className="group bg-card hover:shadow-soft overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1">
      <Link href={activity.href} className="flex h-full flex-col">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

          <span className="bg-background/90 text-primary absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-xl backdrop-blur-md">
            <Icon className="size-5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="text-xl font-bold">{activity.title}</h2>

          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {activity.description}
          </p>

          <span className="text-primary mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
            مشاهده جزئیات
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
