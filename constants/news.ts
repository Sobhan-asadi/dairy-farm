export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  category: string;
  href: string;
};

export const latestNews: NewsItem[] = [
  {
    id: 1,
    title: "راهکارهای بهبود سلامت و بهره‌وری دام",
    excerpt:
      "مروری بر مهم‌ترین اصول تغذیه، نگهداری و پایش سلامت دام در واحدهای پرورشی.",
    image: "/images/news/cattle-health.webp",
    publishedAt: "۱۰ مرداد ۱۴۰۵",
    category: "سلامت دام",
    href: "/news/cattle-health",
  },
  {
    id: 2,
    title: "اهمیت کنترل کیفیت در تولید شیر تازه",
    excerpt:
      "کنترل مستمر بهداشت و کیفیت، نقش مهمی در تولید و عرضه شیر سالم دارد.",
    image: "/images/news/milk-quality.webp",
    publishedAt: "۸ مرداد ۱۴۰۵",
    category: "تولید شیر",
    href: "/news/milk-quality",
  },
  {
    id: 3,
    title: "تغذیه اصولی گوساله و تأثیر آن بر رشد",
    excerpt:
      "برنامه تغذیه مناسب می‌تواند سلامت، رشد و بازده پرورش گوساله را افزایش دهد.",
    image: "/images/news/calf-feeding.webp",
    publishedAt: "۵ مرداد ۱۴۰۵",
    category: "پرورش دام",
    href: "/news/calf-feeding",
  },
];
