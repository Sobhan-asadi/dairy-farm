/** @format */

import { navigationItems } from "@/constants/navigation";
import NavLink from "./nav-link";

export default function DesktopNavigation() {
  return (
    <nav className="hidden lg:block" aria-label="منوی اصلی">
      <ul className="flex items-center gap-6">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              className="text-foreground/70 hover:text-primary data-[active=true]:text-primary after:bg-primary relative inline-flex min-h-11 items-center px-2 text-sm font-medium transition-colors after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:transition-transform data-[active=true]:after:scale-x-100"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
