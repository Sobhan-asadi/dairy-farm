import type { LucideIcon } from "lucide-react";

export type ActivityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
  cover: string;
  slug: string;
  longDescription: string[];
  features: string[];
};
