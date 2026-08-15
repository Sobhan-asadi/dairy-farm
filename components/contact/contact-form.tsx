"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ContactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card shadow-card rounded-2xl border p-5 sm:p-6"
    >
      <FieldGroup>
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
          <FieldLabel htmlFor="phone">شماره موبایل</FieldLabel>

          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="09123456789"
            {...register("phone")}
          />

          {errors.phone && (
            <p role="alert" className="text-destructive text-sm">
              {errors.phone.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">ایمیل (اختیاری)</FieldLabel>

          <Input
            id="email"
            type="email"
            dir="ltr"
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
          <FieldLabel htmlFor="subject">موضوع پیام</FieldLabel>

          <Input id="subject" type="text" {...register("subject")} />

          {errors.subject && (
            <p role="alert" className="text-destructive text-sm">
              {errors.subject.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="message">متن پیام</FieldLabel>

          <textarea
            id="message"
            rows={6}
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 w-full resize-y rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-3"
            {...register("message")}
          />

          {errors.message && (
            <p role="alert" className="text-destructive text-sm">
              {errors.message.message}
            </p>
          )}
        </Field>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </FieldGroup>
    </form>
  );
}
