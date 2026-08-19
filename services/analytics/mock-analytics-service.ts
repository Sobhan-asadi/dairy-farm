import { mockNewsService } from "@/services/admin/mock-news-service";
import { mockOrdersService } from "@/services/admin/mock-orders-service";
import { mockProductService } from "@/services/admin/mock-product-service";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";
import { mockUserService } from "@/services/users/mock-user-service";
import { mockCareerService } from "../careers/api-career-service";

import type {
  AnalyticsService,
  CattleAnalytics,
  MonthlySalesPoint,
} from "./analytics-service";

export const mockAnalyticsService: AnalyticsService = {
  async getSummary() {
    const [users, orders, products, cattle, careers, news] = await Promise.all([
      mockUserService.getUsers({
        page: 1,
        pageSize: 1,
        role: "all",
        status: "all",
      }),

      mockOrdersService.getOrders({
        page: 1,
        pageSize: 1,
        status: "all",
        paymentMethod: "all",
        paymentStatus: "all",
      }),

      mockProductService.getProducts({
        page: 1,
        pageSize: 1,
        purchaseType: "all",
        availability: "all",
      }),

      mockCattleService.getCattle({
        page: 1,
        pageSize: 1,
        status: "all",
      }),

      mockCareerService.getApplications({
        page: 1,
        pageSize: 1,
        status: "all",
      }),

      mockNewsService.getNews({
        page: 1,
        pageSize: 1,
      }),
    ]);

    return {
      totalUsers: users.totalItems,
      totalOrders: orders.totalItems,
      totalProducts: products.totalItems,
      totalCattle: cattle.totalItems,
      totalCareers: careers.totalItems,
      totalNews: news.totalItems,
    };
  },

  async getMonthlySales(): Promise<MonthlySalesPoint[]> {
    const result = await mockOrdersService.getOrders({
      page: 1,
      pageSize: 1000,
      status: "all",
      paymentMethod: "all",
      paymentStatus: "all",
    });

    const monthlySales = new Map<
      string,
      {
        revenue: number;
        orders: number;
      }
    >();

    for (const order of result.items) {
      const date = new Date(order.createdAt);

      if (Number.isNaN(date.getTime())) {
        continue;
      }

      const month = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
      }).format(date);

      const current = monthlySales.get(month) ?? {
        revenue: 0,
        orders: 0,
      };

      monthlySales.set(month, {
        revenue: current.revenue + order.subtotal,
        orders: current.orders + 1,
      });
    }

    return Array.from(monthlySales.entries()).map(([month, values]) => ({
      month,
      revenue: values.revenue,
      orders: values.orders,
    }));
  },

  async getCattleAnalytics(): Promise<CattleAnalytics> {
    const [active, sold, dead, removed] = await Promise.all([
      mockCattleService.getCattle({
        page: 1,
        pageSize: 1,
        status: "active",
      }),

      mockCattleService.getCattle({
        page: 1,
        pageSize: 1,
        status: "sold",
      }),

      mockCattleService.getCattle({
        page: 1,
        pageSize: 1,
        status: "dead",
      }),

      mockCattleService.getCattle({
        page: 1,
        pageSize: 1,
        status: "removed",
      }),
    ]);

    return {
      active: active.totalItems,
      sold: sold.totalItems,
      dead: dead.totalItems,
      removed: removed.totalItems,
    };
  },
};
