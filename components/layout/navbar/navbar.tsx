/** @format */

"use client";

import Container from "@/components/common/container";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import DesktopNavigation from "./desktop-navigation";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
import NavbarActions from "./navbar-actions";

export default function Navbar() {
  const isScrolled = useScroll({
    threshold: 20,
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300",
        isScrolled
          ? "border-border bg-background/95 shadow-soft backdrop-blur-xl"
          : "bg-background/75 border-transparent backdrop-blur-md",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
          <Logo />
          <DesktopNavigation />
          <NavbarActions />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
