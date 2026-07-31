import {
  Beef,
  BicepsFlexed,
  Dna,
  Milk,
  Stethoscope,
  Wheat,
} from "lucide-react";

import type { ActivityItem } from "@/types/activity";

export const activities: ActivityItem[] = [
  {
    title: "فروش دام",
    description: "عرضه دام سالم و باکیفیت متناسب با نیاز مشتریان و مجموعه‌ها.",
    icon: Beef,
    href: "/activities/livestock",
  },
  {
    title: "تولید و عرضه شیر",
    description: "تولید شیر تازه با رعایت اصول بهداشتی و کنترل کیفیت.",
    icon: Milk,
    href: "/activities/milk",
  },
  {
    title: "پرورش گوساله",
    description: "پرورش اصولی گوساله با برنامه تغذیه و مراقبت تخصصی.",
    icon: BicepsFlexed,
    href: "/activities/calves",
  },
  {
    title: "تأمین خوراک دام",
    description: "تأمین خوراک استاندارد برای سلامت و رشد بهتر دام‌ها.",
    icon: Wheat,
    href: "/activities/feed",
  },
  {
    title: "اصلاح نژاد",
    description: "خدمات مرتبط با اصلاح نژاد و بهبود بهره‌وری گله.",
    icon: Dna,
    href: "/activities/breeding",
  },
  {
    title: "خدمات دامپزشکی",
    description: "پایش سلامت، پیشگیری و مراقبت تخصصی از دام‌ها.",
    icon: Stethoscope,
    href: "/activities/veterinary",
  },
];
