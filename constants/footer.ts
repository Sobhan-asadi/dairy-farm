import type { LucideIcon } from "lucide-react";
import { Globe2, MessagesSquare, Send } from "lucide-react";

export type FooterLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const footerLinks = {
  quickAccess: [
    { label: "صفحه اصلی", href: "/" },
    { label: "درباره ما", href: "/about" },
    { label: "فعالیت‌ها", href: "/activities" },
    { label: "تماس با ما", href: "/contact" },
  ],
  services: [
    { label: "فروش دام", href: "/activities/livestock" },
    { label: "تولید و عرضه شیر", href: "/activities/milk" },
    { label: "پرورش گوساله", href: "/activities/calves" },
    { label: "خدمات دامپزشکی", href: "/activities/veterinary" },
  ],
  customer: [
    { label: "فروشگاه", href: "/products" },
    { label: "سبد خرید", href: "/cart" },
    { label: "همکاری با ما", href: "/careers" },
    { label: "قوانین خرید", href: "/terms" },
  ],
} satisfies Record<string, FooterLink[]>;

export const socialLinks: SocialLink[] = [
  {
    label: "اینستاگرام",
    href: "#",
    icon: Globe2,
  },
  {
    label: "لینکدین",
    href: "#",
    icon: MessagesSquare,
  },
  {
    label: "تلگرام",
    href: "#",
    icon: Send,
  },
];
