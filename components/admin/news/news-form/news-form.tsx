"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { createNewsAction, updateNewsAction } from "@/actions/admin/news";
import { Button } from "@/components/ui/button";
import { NewsSchema, type NewsFormValues } from "@/lib/validations/news";
import type {
  CreateNewsInput,
  UpdateNewsInput,
} from "@/services/admin/news-service";
import type { NewsItem } from "@/types/news";

import { NewsBasicFields } from "./news-basic-fields";
import { NewsContentFields } from "./news-content-fields";
import { NewsPublishFields } from "./news-publish-fields";

type NewsFormProps = {
  news?: NewsItem;
};

const MOCK_NEWS_IMAGE = "/images/news/cattle-health.webp";

export function NewsForm({ news }: NewsFormProps) {
  const isEditMode = Boolean(news);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(NewsSchema),

    defaultValues: {
      title: news?.title ?? "",
      slug: news?.slug ?? "",
      excerpt: news?.excerpt ?? "",
      category: news?.category ?? "",
      content: news?.content ?? [],
      status: news?.status ?? "draft",
      publishedAt: news?.publishedAt ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: NewsFormValues) => {
    const baseNews = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      category: values.category,
      status: values.status,
      publishedAt: values.status === "published" ? values.publishedAt : "",
      href: `/news/${values.slug}`,
    };

    if (news) {
      const updatedNews: UpdateNewsInput = {
        ...baseNews,
        image: news.image ?? MOCK_NEWS_IMAGE,
      };

      await updateNewsAction(news.id, updatedNews);

      return;
    }

    const newNews: CreateNewsInput = {
      ...baseNews,
      image: MOCK_NEWS_IMAGE,
    };

    await createNewsAction(newNews);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <NewsBasicFields />

        <NewsContentFields />

        <NewsPublishFields />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-36"
          >
            {isSubmitting
              ? isEditMode
                ? "در حال ذخیره..."
                : "در حال ثبت..."
              : isEditMode
                ? "ذخیره تغییرات"
                : "ثبت خبر"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
