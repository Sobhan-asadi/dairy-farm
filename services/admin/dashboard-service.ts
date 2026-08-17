import type {
  DashboardActionItem,
  DashboardSalesPoint,
  DashboardStats,
  DashboardTrafficStats,
} from "@/types/admin-dashboard";

export interface DashboardService {
  getStats(): Promise<DashboardStats>;
  getSalesTrend(): Promise<DashboardSalesPoint[]>;
  getTrafficStats(): Promise<DashboardTrafficStats>;
  getActionItems(): Promise<DashboardActionItem[]>;
}
