export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "فعالیت‌ها", href: "/activities" },
  { label: "فروشگاه", href: "/products" },
  { label: "اخبار", href: "/news" },
  { label: "همکاری با ما", href: "/careers" },
  { label: "تماس با ما", href: "/contact" },
];
