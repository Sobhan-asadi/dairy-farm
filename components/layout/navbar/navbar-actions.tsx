"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartLink from "./cart-link";

export default function NavbarActions() {
  const { user, isLoading, clearUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
          className="bg-muted h-9 w-24 animate-pulse rounded-lg"
        />
      ) : user ? (
        <div className="flex items-center gap-1">
          <div className="bg-secondary text-primary flex h-9 items-center gap-2 rounded-lg px-3">
            <UserRound className="size-4" />

            <span className="max-w-20 truncate text-sm font-medium">
              {user.fullName}
            </span>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-9 gap-1.5 px-2.5"
          >
            <span className="text-xs font-medium">
              {isLoggingOut ? "در حال خروج..." : "خروج"}
            </span>
          </Button>
        </div>
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
