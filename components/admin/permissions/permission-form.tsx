"use client";

import { useState } from "react";

import { updateUserPermissionsAction } from "@/actions/admin/permissions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PermissionUser } from "@/services/permissions/permission-service";
import type { Permission } from "@/types/auth";

type PermissionFormProps = {
  user: PermissionUser;
};

const permissionOptions = [
  {
    value: "view-dashboard",
    label: "مشاهده داشبورد",
    description: "اجازه مشاهده صفحه اصلی پنل مدیریت",
  },
  {
    value: "manage-products",
    label: "مدیریت محصولات",
    description: "مشاهده، ایجاد و ویرایش محصولات",
  },
  {
    value: "manage-orders",
    label: "مدیریت سفارش‌ها",
    description: "مشاهده و مدیریت سفارش‌های مشتریان",
  },
  {
    value: "manage-users",
    label: "مدیریت کاربران",
    description: "مشاهده و ویرایش اطلاعات کاربران",
  },
  {
    value: "manage-news",
    label: "مدیریت اخبار",
    description: "ایجاد، ویرایش و مدیریت اخبار",
  },
  {
    value: "manage-careers",
    label: "مدیریت درخواست‌های همکاری",
    description: "مشاهده و مدیریت درخواست‌های همکاری",
  },
  {
    value: "manage-kartaks",
    label: "مدیریت کارتکس دام",
    description: "مشاهده و مدیریت اطلاعات و سوابق دام‌ها",
  },
  {
    value: "manage-permissions",
    label: "مدیریت دسترسی‌ها",
    description: "تغییر سطح دسترسی سایر اعضای پنل",
  },
  {
    value: "view-analytics",
    label: "مشاهده آمار و گزارش‌ها",
    description: "دسترسی به آمار و گزارش‌های مدیریتی",
  },
] satisfies {
  value: Permission;
  label: string;
  description: string;
}[];

export function PermissionForm({ user }: PermissionFormProps) {
  const [permissions, setPermissions] = useState<Permission[]>(
    user.permissions,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const togglePermission = (permission: Permission, checked: boolean) => {
    setPermissions((current) => {
      if (checked) {
        return current.includes(permission)
          ? current
          : [...current, permission];
      }

      return current.filter((item) => item !== permission);
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await updateUserPermissionsAction(user.id, {
        permissions,
      });

      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "ذخیره دسترسی‌ها با خطا مواجه شد.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">دسترسی‌های پنل</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          دسترسی‌های موردنیاز این کاربر را انتخاب کنید.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {permissionOptions.map((permission) => {
          const checked = permissions.includes(permission.value);

          return (
            <div
              key={permission.value}
              className="flex items-start gap-3 rounded-lg border p-4"
            >
              <Checkbox
                id={permission.value}
                checked={checked}
                onCheckedChange={(value) =>
                  togglePermission(permission.value, value === true)
                }
              />

              <div className="grid gap-1">
                <Label htmlFor={permission.value} className="cursor-pointer">
                  {permission.label}
                </Label>

                <p className="text-muted-foreground text-xs leading-5">
                  {permission.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="text-destructive mt-5 text-sm">
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end border-t pt-5">
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full sm:w-auto sm:min-w-36"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره دسترسی‌ها"}
        </Button>
      </div>
    </section>
  );
}
