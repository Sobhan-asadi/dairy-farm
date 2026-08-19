import { notFound } from "next/navigation";

import { UserForm } from "@/components/admin/users/user-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockUserService } from "@/services/users/mock-user-service";

type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({ params }: EditUserPageProps) {
  await requirePermission("manage-users");

  const { id } = await params;

  const user = await mockUserService.getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">مدیریت کاربران</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          ویرایش کاربر
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          ویرایش اطلاعات و وضعیت حساب {user.fullName}
        </p>
      </div>

      <UserForm user={user} />
    </div>
  );
}
