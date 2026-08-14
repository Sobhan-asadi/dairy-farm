"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  RegisterSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setSubmitError("");

      const registerData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };

      const result = await mockAuthService.register(registerData);

      setUser(result.user);

      router.push("/");
    } catch {
      setSubmitError("ثبت‌نام انجام نشد. دوباره تلاش کنید.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card shadow-card mx-auto w-full max-w-md rounded-3xl border p-6 sm:p-8"
    >
      <div>
        <span className="text-primary text-sm font-semibold">
          ایجاد حساب کاربری
        </span>

        <h1 className="mt-2 text-3xl font-black">ثبت‌نام</h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          برای ایجاد حساب کاربری، اطلاعات زیر را وارد کنید.
        </p>
      </div>

      <FieldGroup className="mt-8">
        <Field>
          <FieldLabel htmlFor="fullName">نام و نام خانوادگی</FieldLabel>

          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            {...register("fullName")}
          />

          {errors.fullName && (
            <p role="alert" className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
        </Field>

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
          <FieldLabel htmlFor="password">رمز عبور</FieldLabel>

          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />

          {errors.password && (
            <p role="alert" className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">تکرار رمز عبور</FieldLabel>

          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p role="alert" className="text-destructive text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        {submitError && (
          <p role="alert" className="text-destructive text-sm">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </Button>
      </FieldGroup>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        قبلاً حساب ساخته‌اید؟{" "}
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          ورود
        </Link>
      </p>
    </form>
  );
}
