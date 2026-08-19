export type AnalyticsSummary = {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalCattle: number;
  totalCareers: number;
  totalNews: number;
};

export type MonthlySalesPoint = {
  month: string;
  revenue: number;
  orders: number;
};

export type CattleAnalytics = {
  active: number;
  sold: number;
  dead: number;
  removed: number;
};

export interface AnalyticsService {
  getSummary(): Promise<AnalyticsSummary>;

  getMonthlySales(): Promise<MonthlySalesPoint[]>;

  getCattleAnalytics(): Promise<CattleAnalytics>;
}
