"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/auth/require-permission";
import { mockNewsService } from "@/services/admin/mock-news-service";
import type {
  CreateNewsInput,
  UpdateNewsInput,
} from "@/services/admin/news-service";

export async function createNewsAction(news: CreateNewsInput): Promise<void> {
  await requirePermission("manage-news");

  await mockNewsService.createNews(news);

  revalidatePath("/admin/news");
  revalidatePath("/news");

  redirect("/admin/news");
}

export async function updateNewsAction(
  id: number,
  news: UpdateNewsInput,
): Promise<void> {
  await requirePermission("manage-news");

  const updatedNews = await mockNewsService.updateNews(id, news);

  revalidatePath("/admin/news");
  revalidatePath(`/admin/news/${id}/edit`);

  revalidatePath("/news");
  revalidatePath(`/news/${updatedNews.slug}`);

  redirect("/admin/news");
}

export async function deleteNewsAction(id: number): Promise<void> {
  await requirePermission("manage-news");

  const news = await mockNewsService.getNewsById(id);

  if (!news) {
    return;
  }

  await mockNewsService.deleteNews(id);

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${news.slug}`);
}
