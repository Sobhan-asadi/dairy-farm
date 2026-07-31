import {
  BadgeCheck,
  HeartPulse,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type WhyUsItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyUsItems: WhyUsItem[] = [
  {
    title: "سلامت و کیفیت دام",
    description:
      "دام‌ها با نظارت تخصصی و رعایت اصول بهداشتی نگهداری و عرضه می‌شوند.",
    icon: HeartPulse,
  },
  {
    title: "تأمین مطمئن",
    description:
      "فرآیند تأمین و عرضه با برنامه‌ریزی دقیق و متناسب با نیاز مشتری انجام می‌شود.",
    icon: ShieldCheck,
  },
  {
    title: "کنترل مستمر کیفیت",
    description:
      "محصولات و خدمات مجموعه در مراحل مختلف تحت بررسی و کنترل قرار می‌گیرند.",
    icon: BadgeCheck,
  },
  {
    title: "ارسال و پشتیبانی",
    description:
      "هماهنگی خرید، ارسال و پیگیری سفارش‌ها با پشتیبانی مجموعه انجام می‌شود.",
    icon: Truck,
  },
];
