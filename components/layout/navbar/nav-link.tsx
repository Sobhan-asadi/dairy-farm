/** @format */

"use client";

import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type NavLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export default function NavLink({
  href,
  children,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const hrefValue = typeof href === "string" ? href : href.pathname;

  const isActive =
    hrefValue === "/"
      ? pathname === "/"
      : Boolean(hrefValue && pathname.startsWith(hrefValue));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
