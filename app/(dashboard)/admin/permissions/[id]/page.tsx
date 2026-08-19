import { notFound } from "next/navigation";

import { PermissionForm } from "@/components/admin/permissions/permission-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockPermissionService } from "@/services/permissions/mock-permission-service";

type PermissionDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PermissionDetailsPage({
  params,
}: PermissionDetailsPageProps) {
  await requirePermission("manage-permissions");

  const { id } = await params;

  const user = await mockPermissionService.getPermissionUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">مدیریت دسترسی‌ها</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          دسترسی‌های {user.fullName}
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          تعیین بخش‌هایی از پنل که این کاربر اجازه دسترسی به آن‌ها را دارد.
        </p>
      </div>

      <PermissionForm user={user} />
    </div>
  );
}
