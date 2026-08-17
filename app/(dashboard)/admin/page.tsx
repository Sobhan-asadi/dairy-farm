import { Beef, BriefcaseBusiness, Package, ShoppingCart } from "lucide-react";

import { ActionItems } from "@/components/admin/dashboard/action-items";
import { DashboardStatCard } from "@/components/admin/dashboard/dashboard-stat-card";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { SalesTrendChart } from "@/components/admin/dashboard/sales-trend-chart";
import { TrafficOverview } from "@/components/admin/dashboard/traffic-overview";
import { hasPermission } from "@/lib/auth/permissions";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockDashboardService } from "@/services/admin/mock-dashboard-service";
import { mockOrdersService } from "@/services/admin/mock-orders-service";

export default async function AdminPage() {
  const user = await requirePermission("view-dashboard");

  const isManager = user.role === "manager";

  const canManageProducts = hasPermission(user, "manage-products");
  const canManageOrders = hasPermission(user, "manage-orders");
  const canManageCareers = hasPermission(user, "manage-careers");
  const canManageKartaks = hasPermission(user, "manage-kartaks");

  const canViewOperationalActions = canManageOrders || canManageCareers;

  const [stats, orders, salesTrend, trafficStats, actionItems] =
    await Promise.all([
      mockDashboardService.getStats(),

      canManageOrders ? mockOrdersService.getOrders() : Promise.resolve(null),

      isManager ? mockDashboardService.getSalesTrend() : Promise.resolve(null),

      isManager
        ? mockDashboardService.getTrafficStats()
        : Promise.resolve(null),

      canViewOperationalActions
        ? mockDashboardService.getActionItems()
        : Promise.resolve(null),
    ]);

  const recentOrders = orders?.slice(0, 5) ?? [];

  const visibleActionItems =
    actionItems?.filter((item) => {
      if (item.type === "order") {
        return canManageOrders;
      }

      if (item.type === "career") {
        return canManageCareers;
      }

      return false;
    }) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">داشبورد</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          نمای کلی وضعیت مجموعه دامداری
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {canManageProducts && (
          <DashboardStatCard
            title="محصولات"
            value={stats.totalProducts}
            icon={Package}
          />
        )}

        {canManageOrders && (
          <DashboardStatCard
            title="سفارش‌های در انتظار"
            value={stats.pendingOrders}
            icon={ShoppingCart}
          />
        )}

        {canManageCareers && (
          <DashboardStatCard
            title="درخواست‌های همکاری"
            value={stats.careerRequests}
            icon={BriefcaseBusiness}
          />
        )}

        {canManageKartaks && (
          <DashboardStatCard
            title="دام‌های ثبت‌شده"
            value={stats.registeredCattle}
            icon={Beef}
          />
        )}
      </div>

      {canViewOperationalActions && <ActionItems items={visibleActionItems} />}

      {canManageOrders && <RecentOrders orders={recentOrders} />}

      {salesTrend && <SalesTrendChart data={salesTrend} />}

      {trafficStats && <TrafficOverview data={trafficStats} />}
    </div>
  );
}
