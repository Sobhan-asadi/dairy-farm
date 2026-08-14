"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const { setUser } = useAuth();

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setSubmitError("");

      const result = await mockAuthService.login(data);

      setUser(result.user);

      const destination =
        nextPath?.startsWith("/") && !nextPath.startsWith("//")
          ? nextPath
          : "/";

      router.replace(destination);
    } catch {
      setSubmitError("ورود انجام نشد. دوباره تلاش کنید.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card shadow-card mx-auto w-full max-w-md rounded-3xl border p-6 sm:p-8"
    >
      <div>
        <span className="text-primary text-sm font-semibold">ورود به حساب</span>

        <h1 className="mt-2 text-3xl font-black">خوش آمدید</h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          برای ورود به حساب کاربری، اطلاعات خود را وارد کنید.
        </p>
      </div>

      <FieldGroup className="mt-8">
        <Field>
          <FieldLabel htmlFor="email">ایمیل</FieldLabel>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            {...register("email")}
          />

          {errors.email && (
            <p role="alert" className="text-destructive text-sm">
              {errors.email.message}
            </p>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor="password">رمز عبور</FieldLabel>

            <Link
              href="/forgot-password"
              className="text-primary text-xs font-semibold hover:underline"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />

          {errors.password && (
            <p role="alert" className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </Field>

        {submitError && (
          <p role="alert" className="text-destructive text-sm">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </FieldGroup>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        حساب کاربری ندارید؟{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          ثبت‌نام
        </Link>
      </p>
    </form>
  );
}
