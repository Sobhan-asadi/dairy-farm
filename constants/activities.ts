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
    slug: "livestock",
    title: "فروش دام",
    description: "عرضه دام سالم و باکیفیت متناسب با نیاز مشتریان و مجموعه‌ها.",
    longDescription: [
      "دام‌های مجموعه با رعایت اصول بهداشتی و تحت نظارت مستمر نگهداری می‌شوند تا سلامت و کیفیت آن‌ها تضمین شود.",
      "فرآیند عرضه دام بر اساس نیاز مشتریان و با ارائه مشاوره تخصصی انجام می‌شود تا بهترین انتخاب برای هر مجموعه فراهم گردد.",
    ],
    features: [
      "دام سالم و تأیید شده",
      "مشاوره قبل از خرید",
      "پشتیبانی فرایند خرید",
    ],
    icon: Beef,
    href: "/activities/livestock",
    image: "/images/activities/livestock.jpg",
    cover: "/images/activities/livestock-cover.jpg",
  },

  {
    slug: "milk",
    title: "تولید و عرضه شیر",
    description: "تولید شیر تازه با رعایت اصول بهداشتی و کنترل کیفیت.",
    longDescription: [
      "شیر تولیدی مجموعه به‌صورت روزانه جمع‌آوری و تحت کنترل کیفیت قرار می‌گیرد.",
      "تمام مراحل تولید مطابق استانداردهای بهداشتی انجام می‌شود.",
    ],
    features: ["تولید روزانه", "کنترل کیفیت", "بسته‌بندی بهداشتی"],
    icon: Milk,
    href: "/activities/milk",
    image: "/images/activities/milk.jpg",
    cover: "/images/activities/milk-cover.jpg",
  },

  {
    slug: "calves",
    title: "پرورش گوساله",
    description: "پرورش اصولی گوساله با برنامه تغذیه و مراقبت تخصصی.",
    longDescription: [
      "گوساله‌ها از ابتدای تولد تحت برنامه تغذیه و مراقبت تخصصی قرار می‌گیرند.",
      "هدف مجموعه افزایش سلامت، رشد و بهره‌وری دام‌ها است.",
    ],
    features: ["برنامه تغذیه", "پایش رشد", "مراقبت دامپزشکی"],
    icon: BicepsFlexed,
    href: "/activities/calves",
    image: "/images/activities/calves.jpg",
    cover: "/images/activities/calves-cover.jpg",
  },

  {
    slug: "feed",
    title: "تأمین خوراک دام",
    description: "تأمین خوراک استاندارد برای سلامت و رشد بهتر دام‌ها.",
    longDescription: [
      "خوراک دام از منابع معتبر تهیه و بر اساس نیاز دام‌ها تأمین می‌شود.",
      "کیفیت خوراک تأثیر مستقیم بر سلامت و بهره‌وری دام دارد.",
    ],
    features: ["خوراک استاندارد", "تغذیه متعادل", "کنترل کیفیت خوراک"],
    icon: Wheat,
    href: "/activities/feed",
    image: "/images/activities/feed.jpg",
    cover: "/images/activities/feed-cover.jpg",
  },

  {
    slug: "breeding",
    title: "اصلاح نژاد",
    description: "خدمات مرتبط با اصلاح نژاد و بهبود بهره‌وری گله.",
    longDescription: [
      "استفاده از روش‌های نوین اصلاح نژاد موجب افزایش کیفیت گله می‌شود.",
      "هدف این خدمات، بهبود راندمان تولید و سلامت دام‌ها است.",
    ],
    features: ["اصلاح نژاد", "افزایش بهره‌وری", "مشاوره تخصصی"],
    icon: Dna,
    href: "/activities/breeding",
    image: "/images/activities/breeding.jpg",
    cover: "/images/activities/breeding-cover.jpg",
  },

  {
    slug: "veterinary",
    title: "خدمات دامپزشکی",
    description: "پایش سلامت، پیشگیری و مراقبت تخصصی از دام‌ها.",
    longDescription: [
      "دامپزشکان مجموعه سلامت دام‌ها را به‌صورت مستمر بررسی می‌کنند.",
      "واکسیناسیون، درمان و پیشگیری از بیماری‌ها بخشی از خدمات این مجموعه است.",
    ],
    features: ["واکسیناسیون", "معاینات دوره‌ای", "درمان تخصصی"],
    icon: Stethoscope,
    href: "/activities/veterinary",
    image: "/images/activities/veterinary.avif",
    cover: "/images/activities/veterinary-cover.avif",
  },
];
