import { latestNews } from "@/constants/news";
import type {
  CreateNewsInput,
  NewsService,
  UpdateNewsInput,
} from "@/services/admin/news-service";
import type { NewsItem } from "@/types/news";

type GlobalWithMockNews = typeof globalThis & {
  __dairyFarmMockNews?: NewsItem[];
};

const globalForNews = globalThis as GlobalWithMockNews;

const getMockNews = () => {
  if (!globalForNews.__dairyFarmMockNews) {
    globalForNews.__dairyFarmMockNews = structuredClone(latestNews);
  }

  return globalForNews.__dairyFarmMockNews;
};

const setMockNews = (news: NewsItem[]) => {
  globalForNews.__dairyFarmMockNews = news;
};

export const mockNewsService: NewsService = {
  async getNews({ page, pageSize, search }) {
    const mockNews = getMockNews();

    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredNews = mockNews.filter((news) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        news.title.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        news.category.toLocaleLowerCase("fa-IR").includes(normalizedSearch)
      );
    });

    const totalItems = filteredNews.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;
    const endIndex = startIndex + safePageSize;

    return {
      items: filteredNews.slice(startIndex, endIndex),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getNewsById(id) {
    const mockNews = getMockNews();

    return mockNews.find((news) => news.id === id) ?? null;
  },

  async createNews(data: CreateNewsInput) {
    const mockNews = getMockNews();

    const nextId =
      mockNews.length > 0
        ? Math.max(...mockNews.map((news) => news.id)) + 1
        : 1;

    const news: NewsItem = {
      id: nextId,
      ...data,
    };

    setMockNews([news, ...mockNews]);

    return news;
  },

  async updateNews(id: number, data: UpdateNewsInput) {
    const mockNews = getMockNews();

    const news = mockNews.find((news) => news.id === id);

    if (!news) {
      throw new Error("خبر پیدا نشد.");
    }

    const updatedNews: NewsItem = {
      ...news,
      ...data,
      id: news.id,
    };

    setMockNews(
      mockNews.map((currentNews) =>
        currentNews.id === id ? updatedNews : currentNews,
      ),
    );

    return updatedNews;
  },

  async deleteNews(id: number) {
    const mockNews = getMockNews();

    const newsExists = mockNews.some((news) => news.id === id);

    if (!newsExists) {
      throw new Error("خبر پیدا نشد.");
    }

    setMockNews(mockNews.filter((news) => news.id !== id));
  },
};
