import Link from "next/link";

import { Button } from "@/components/ui/button";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockPermissionService } from "@/services/permissions/mock-permission-service";

const roleLabels = {
  customer: "مشتری",
  manager: "مدیر",
  admin: "ادمین",
  kartaks: "مسئول کارتکس",
} as const;

export default async function PermissionsPage() {
  await requirePermission("manage-permissions");

  const users = await mockPermissionService.getPermissionUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          مدیریت دسترسی‌ها
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          تعیین دسترسی اعضای پنل مدیریت به بخش‌های مختلف
        </p>
      </div>

      <div className="bg-card overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-4 py-3 text-right font-medium">کاربر</th>

              <th className="px-4 py-3 text-right font-medium">ایمیل</th>

              <th className="px-4 py-3 text-right font-medium">نقش</th>

              <th className="px-4 py-3 text-right font-medium">تعداد دسترسی</th>

              <th className="px-4 py-3 text-right font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4 font-medium">{user.fullName}</td>

                <td className="px-4 py-4">
                  <bdi>{user.email}</bdi>
                </td>

                <td className="px-4 py-4">{roleLabels[user.role]}</td>

                <td className="px-4 py-4">
                  {user.role === "manager"
                    ? "دسترسی کامل"
                    : user.permissions.length.toLocaleString("fa-IR")}
                </td>

                <td className="px-4 py-4">
                  {user.role === "manager" ? (
                    <span className="text-muted-foreground text-xs">
                      غیرقابل ویرایش
                    </span>
                  ) : (
                    <Button
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/permissions/${user.id}`}>
                          مدیریت دسترسی
                        </Link>
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
