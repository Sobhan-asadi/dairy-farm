"use client";

import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { NewsFormValues } from "@/lib/validations/news";

const newsStatusLabels = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
} satisfies Record<NewsFormValues["status"], string>;

export function NewsPublishFields() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<NewsFormValues>();

  const status = watch("status");

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>انتشار خبر</FieldLegend>

        <FieldGroup>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.image)}>
                <FieldLabel htmlFor="image">تصویر خبر</FieldLabel>

                <Input
                  id="image"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0]);
                  }}
                  aria-invalid={Boolean(errors.image)}
                />

                <FieldDescription>
                  تصویر خبر را از دستگاه انتخاب کنید. حداکثر حجم ۵ مگابایت.
                </FieldDescription>

                <FieldError errors={[errors.image]} />
              </Field>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.status)}>
                <FieldLabel>وضعیت خبر</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    {newsStatusLabels[field.value]}
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="draft">پیش‌نویس</SelectItem>

                    <SelectItem value="published">منتشرشده</SelectItem>
                  </SelectContent>
                </Select>

                <FieldError errors={[errors.status]} />
              </Field>
            )}
          />

          {status === "published" && (
            <Field data-invalid={Boolean(errors.publishedAt)}>
              <FieldLabel htmlFor="publishedAt">تاریخ انتشار</FieldLabel>

              <Input
                id="publishedAt"
                placeholder="۱۰ مرداد ۱۴۰۵"
                {...register("publishedAt")}
                aria-invalid={Boolean(errors.publishedAt)}
              />

              <FieldError errors={[errors.publishedAt]} />
            </Field>
          )}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
