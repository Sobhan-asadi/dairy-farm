import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { AuthUser } from "@/types/auth";

type AdminHeaderProps = {
  user: AuthUser;
};

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-background/95 sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b px-4 backdrop-blur md:px-6">
      <SidebarTrigger />

      <Separator orientation="vertical" className="h-5" />

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">پنل مدیریت</p>
        <p className="text-muted-foreground truncate text-xs">
          {user.fullName}
        </p>
      </div>
    </header>
  );
}
