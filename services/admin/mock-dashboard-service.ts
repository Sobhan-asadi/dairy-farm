import type { DashboardService } from "@/services/admin/dashboard-service";

export const mockDashboardService: DashboardService = {
  async getStats() {
    return {
      totalProducts: 12,
      pendingOrders: 7,
      careerRequests: 4,
      registeredCattle: 86,
    };
  },

  async getActionItems() {
    return [
      {
        id: "DF-1003",
        type: "order",
        title: "سفارش نیازمند بررسی",
        description: "سفارش علی محمدی در وضعیت در حال بررسی قرار دارد.",
        href: "/admin/orders/DF-1003",
        createdAt: "2026-08-16T10:30:00.000Z",
      },
      {
        id: "career-1001",
        type: "career",
        title: "درخواست همکاری جدید",
        description: "یک درخواست همکاری جدید ثبت شده است.",
        href: "/admin/careers/career-1001",
        createdAt: "2026-08-16T09:15:00.000Z",
      },
    ];
  },

  async getSalesTrend() {
    return [
      {
        date: "2026-08-10",
        orders: 3,
        revenue: 8_500_000,
      },
      {
        date: "2026-08-11",
        orders: 5,
        revenue: 12_400_000,
      },
      {
        date: "2026-08-12",
        orders: 4,
        revenue: 10_800_000,
      },
      {
        date: "2026-08-13",
        orders: 7,
        revenue: 18_200_000,
      },
      {
        date: "2026-08-14",
        orders: 6,
        revenue: 15_600_000,
      },
      {
        date: "2026-08-15",
        orders: 8,
        revenue: 21_300_000,
      },
      {
        date: "2026-08-16",
        orders: 7,
        revenue: 18_500_000,
      },
    ];
  },

  async getTrafficStats() {
    return {
      totalViews: 12_480,
      uniqueVisitors: 7_320,
      todayViews: 486,
      viewsByDay: [
        { date: "2026-08-10", views: 320 },
        { date: "2026-08-11", views: 385 },
        { date: "2026-08-12", views: 341 },
        { date: "2026-08-13", views: 420 },
        { date: "2026-08-14", views: 398 },
        { date: "2026-08-15", views: 451 },
        { date: "2026-08-16", views: 486 },
      ],
    };
  },
};
