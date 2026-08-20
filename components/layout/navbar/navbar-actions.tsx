"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartLink from "./cart-link";

export default function NavbarActions() {
  const { user, isLoading, clearUser } = useAuth();
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
    <div className="hidden items-center gap-2 lg:flex">
      {isLoading ? (
        <div
          aria-hidden="true"
          className="bg-muted size-9 animate-pulse rounded-full"
        />
      ) : user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="منوی حساب کاربری"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-secondary text-primary">
                      <UserRound className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.fullName}
                    </p>

                    <p
                      dir="ltr"
                      className="text-muted-foreground mt-1 truncate text-left text-xs font-normal"
                    >
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />

                  {isLoggingOut ? "در حال خروج..." : "خروج از حساب"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {canAccessDashboard && (
            <Link
              href="/admin"
              className={buttonVariants({
                variant: "outline",
                className: "gap-2",
              })}
            >
              <LayoutDashboard className="size-4" />
              پنل مدیریت
            </Link>
          )}
        </>
      ) : (
        <Link
          href="/login"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          ورود
        </Link>
      )}

      <CartLink />

      <Link
        href="/products"
        className={buttonVariants({
          variant: "default",
        })}
      >
        مشاهده محصولات
      </Link>
    </div>
  );
}
