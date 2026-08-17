export type DashboardStats = {
  totalProducts: number;
  pendingOrders: number;
  careerRequests: number;
  registeredCattle: number;
};
export type DashboardSalesPoint = {
  date: string;
  orders: number;
  revenue: number;
};

export type DashboardTrafficStats = {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  viewsByDay: {
    date: string;
    views: number;
  }[];
};

export type DashboardActionItem = {
  id: string;
  type: "order" | "career";
  title: string;
  description: string;
  href: string;
  createdAt: string;
};
