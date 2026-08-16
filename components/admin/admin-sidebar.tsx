"use client";

import {
  BarChart3,
  Beef,
  LayoutDashboard,
  Newspaper,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

import { AdminNav, type AdminNavItem } from "@/components/admin/admin-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { hasPermission } from "@/lib/auth/permissions";
import type { AuthUser, Permission } from "@/types/auth";

type AdminSidebarProps = {
  user: AuthUser;
};

type AdminNavigationItem = AdminNavItem & {
  permission: Permission;
};

const adminNavigation: AdminNavigationItem[] = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "view-dashboard",
  },
  {
    title: "محصولات",
    href: "/admin/products",
    icon: Package,
    permission: "manage-products",
  },
  {
    title: "سفارش‌ها",
    href: "/admin/orders",
    icon: ShoppingCart,
    permission: "manage-orders",
  },
  {
    title: "اخبار",
    href: "/admin/news",
    icon: Newspaper,
    permission: "manage-news",
  },
  {
    title: "کاردکس دام",
    href: "/admin/cattle",
    icon: Beef,
    permission: "manage-kartaks",
  },
  {
    title: "کاربران",
    href: "/admin/users",
    icon: Users,
    permission: "manage-users",
  },
  {
    title: "دسترسی‌ها",
    href: "/admin/permissions",
    icon: ShieldCheck,
    permission: "manage-users",
  },
  {
    title: "آمار و گزارش‌ها",
    href: "/admin/analytics",
    icon: BarChart3,
    permission: "view-analytics",
  },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const visibleNavigation = adminNavigation.filter((item) =>
    hasPermission(user, item.permission),
  );

  return (
    <Sidebar side="right" collapsible="icon" dir="rtl">
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin" />}
              tooltip="پنل مدیریت"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
                <Beef className="size-4" />
              </div>

              <div className="grid flex-1 text-right text-sm leading-tight">
                <span className="truncate font-semibold">دامداری</span>
                <span className="text-muted-foreground truncate text-xs">
                  پنل مدیریت
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <AdminNav items={visibleNavigation} />
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t">
        <div className="min-w-0 px-2 py-1 group-data-[collapsible=icon]:hidden">
          <p className="truncate text-sm font-medium">{user.fullName}</p>
          <p className="text-muted-foreground truncate text-xs">
            {user.role === "manager" ? "مدیر" : "ادمین"}
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
