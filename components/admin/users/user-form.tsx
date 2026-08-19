"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { updateUserAction } from "@/actions/admin/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSchema, type UserFormValues } from "@/lib/validations/user";
import type { User } from "@/types/user";

type UserFormProps = {
  user: User;
};

export function UserForm({ user }: UserFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),

    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });

  const onSubmit = async (values: UserFormValues) => {
    const result = await updateUserAction(user.id, values);

    if (!result.success) {
      setError("root", {
        type: "server",
        message: result.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card space-y-6 rounded-xl border p-5 sm:p-6"
    >
      <div>
        <h2 className="font-semibold">اطلاعات کاربر</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          اطلاعات حساب، نقش و وضعیت کاربر را ویرایش کنید.
        </p>
      </div>

      {errors.root?.message && (
        <div
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm"
        >
          {errors.root.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">نام و نام خانوادگی</Label>

          <Input id="fullName" {...register("fullName")} />

          {errors.fullName?.message && (
            <p className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>

          <Input id="email" type="email" dir="ltr" {...register("email")} />

          {errors.email?.message && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>نقش</Label>

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {field.value === "manager"
                      ? "مدیر"
                      : field.value === "admin"
                        ? "ادمین"
                        : field.value === "kartaks"
                          ? "مسئول کارتکس"
                          : "مشتری"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="manager">مدیر</SelectItem>

                  <SelectItem value="admin">ادمین</SelectItem>

                  <SelectItem value="kartaks">مسئول کارتکس</SelectItem>

                  <SelectItem value="customer">مشتری</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.role?.message && (
            <p className="text-destructive text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>وضعیت حساب</Label>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {field.value === "active" ? "فعال" : "غیرفعال"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">فعال</SelectItem>

                  <SelectItem value="inactive">غیرفعال</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status?.message && (
            <p className="text-destructive text-sm">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end border-t pt-5">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:min-w-36"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
