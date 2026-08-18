export type NewsStatus = "draft" | "published";

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  publishedAt: string;
  category: string;
  href: string;
  status: NewsStatus;
};
