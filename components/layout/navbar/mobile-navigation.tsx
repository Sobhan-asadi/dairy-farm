"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/constants/navigation";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { LayoutDashboard, LogIn, LogOut, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartLink from "./cart-link";
import Logo from "./logo";
import NavLink from "./nav-link";

export default function MobileNavigation() {
  const { user, clearUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const canAccessDashboard = user?.role === "manager" || user?.role === "admin";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await mockAuthService.logout();

      clearUser();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-1 lg:hidden">
      <CartLink />

      <Sheet>
        <SheetTrigger
          aria-label="باز کردن منوی اصلی"
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          <Menu />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex w-[min(88vw,22rem)] flex-col px-5 pb-6"
        >
          <SheetHeader className="border-border flex items-center gap-2 border-b pb-5 text-right">
            <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
            <Logo />
          </SheetHeader>

          {user && (
            <div className="bg-muted/60 mt-5 flex items-center gap-3 rounded-xl p-3">
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                <UserRound className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{user.fullName}</p>

                <p
                  dir="ltr"
                  className="text-muted-foreground mt-0.5 truncate text-left text-xs"
                >
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <nav aria-label="منوی اصلی موبایل" className="flex-1 py-5">
            <ul className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <SheetClose
                    nativeButton={false}
                    render={
                      <NavLink
                        href={item.href}
                        className="hover:bg-muted hover:text-primary data-[active=true]:bg-secondary data-[active=true]:text-primary flex min-h-11 w-full items-center rounded-lg px-3 text-sm font-medium transition-colors"
                      >
                        {item.label}
                      </NavLink>
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-border flex flex-col gap-2 border-t pt-5">
            {canAccessDashboard && (
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/admin"
                    className={buttonVariants({
                      variant: "secondary",
                      className: "w-full gap-2",
                    })}
                  >
                    <LayoutDashboard className="size-4" />
                    پنل مدیریت
                  </Link>
                }
              />
            )}

            {user ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full"
              >
                <LogOut className="size-4" />

                {isLoggingOut ? "در حال خروج..." : "خروج از حساب"}
              </Button>
            ) : (
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full gap-2",
                    })}
                  >
                    <LogIn className="size-4" />
                    ورود به حساب
                  </Link>
                }
              />
            )}

            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/products"
                  className={buttonVariants({
                    className: "w-full",
                  })}
                >
                  مشاهده محصولات
                </Link>
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
