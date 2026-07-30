/** @format */

"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/constants/navigation";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import NavLink from "./nav-link";

export default function MobileNavigation() {
  return (
    <div className="flex items-center gap-1 lg:hidden">
      <Link
        href="/cart"
        aria-label="سبد خرید"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <ShoppingCart />
      </Link>

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
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              ورود
            </Link>

            <Link
              href="/products"
              className={buttonVariants({
                className: "w-full",
              })}
            >
              مشاهده محصولات
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
