"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { mockAuthService } from "@/services/auth/mock-auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setSubmitError("");
      setSubmitted(false);

      await mockAuthService.forgotPassword(data.email);

      setSubmitted(true);
    } catch {
      setSubmitError("ارسال لینک بازیابی انجام نشد. دوباره تلاش کنید.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card shadow-card mx-auto w-full max-w-md rounded-3xl border p-6 sm:p-8"
    >
      <div>
        <span className="text-primary text-sm font-semibold">بازیابی حساب</span>

        <h1 className="mt-2 text-3xl font-black">فراموشی رمز عبور</h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          ایمیل حساب کاربری خود را وارد کنید تا مراحل بازیابی رمز عبور برای شما
          ارسال شود.
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

        {submitError && (
          <p role="alert" className="text-destructive text-sm">
            {submitError}
          </p>
        )}

        {submitted && (
          <p role="status" className="text-primary text-sm leading-7">
            اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی برای شما ارسال
            می‌شود.
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "در حال ارسال..." : "ارسال لینک بازیابی"}
        </Button>
      </FieldGroup>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        رمز عبور را به خاطر آوردید؟{" "}
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          بازگشت به ورود
        </Link>
      </p>
    </form>
  );
}
