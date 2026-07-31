export type ProductItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
};

export const featuredProducts: ProductItem[] = [
  {
    id: 1,
    title: "دام زنده سالم",
    description:
      "عرضه دام سالم و پرورش‌یافته تحت نظارت، مناسب مجموعه‌ها و خریداران عمده.",
    category: "دام زنده",
    image: "/images/products/livestock.webp",
    href: "/products/livestock",
  },
  {
    id: 2,
    title: "شیر تازه دامداری",
    description: "شیر تازه تولیدشده با رعایت اصول بهداشتی و کنترل مستمر کیفیت.",
    category: "محصولات لبنی",
    image: "/images/products/milk.webp",
    href: "/products/fresh-milk",
  },
  {
    id: 3,
    title: "گوساله پرورشی",
    description:
      "گوساله‌های سالم با برنامه تغذیه و مراقبت تخصصی برای پرورش اصولی.",
    category: "پرورش دام",
    image: "/images/products/calf.webp",
    href: "/products/calves",
  },
];
