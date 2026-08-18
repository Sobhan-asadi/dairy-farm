import type { NewsItem } from "@/types/news";

export type NewsListParams = {
  page: number;
  pageSize: number;
  search?: string;
};

export type PaginatedNews = {
  items: NewsItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CreateNewsInput = Omit<NewsItem, "id">;

export type UpdateNewsInput = Partial<Omit<NewsItem, "id">>;

export interface NewsService {
  getNews(params: NewsListParams): Promise<PaginatedNews>;

  getNewsById(id: number): Promise<NewsItem | null>;

  createNews(data: CreateNewsInput): Promise<NewsItem>;

  updateNews(id: number, data: UpdateNewsInput): Promise<NewsItem>;

  deleteNews(id: number): Promise<void>;
}
