import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

type UsersTableProps = {
  users: User[];
};

const roleLabels = {
  customer: "مشتری",
  manager: "مدیر",
  admin: "ادمین",
  kartaks: "مسئول کارتکس",
} satisfies Record<User["role"], string>;

const statusLabels = {
  active: "فعال",
  inactive: "غیرفعال",
} satisfies Record<User["status"], string>;

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="bg-card rounded-xl border px-5 py-12 text-center">
        <p className="font-medium">کاربری پیدا نشد</p>

        <p className="text-muted-foreground mt-2 text-sm">
          کاربری مطابق با اطلاعات فعلی وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-right font-medium">نام کاربر</th>

            <th className="px-4 py-3 text-right font-medium">ایمیل</th>

            <th className="px-4 py-3 text-right font-medium">نقش</th>

            <th className="px-4 py-3 text-right font-medium">وضعیت</th>

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

              <td className="px-4 py-4">{statusLabels[user.status]}</td>

              <td className="px-4 py-4">
                <Button
                  nativeButton={false}
                  variant="ghost"
                  size="icon"
                  render={
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      aria-label={`ویرایش ${user.fullName}`}
                    >
                      <Pencil className="size-4" />
                    </Link>
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
