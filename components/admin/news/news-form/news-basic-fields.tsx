"use client";

import { useFormContext } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import type { NewsFormValues } from "@/lib/validations/news";

export function NewsBasicFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewsFormValues>();

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>اطلاعات اصلی خبر</FieldLegend>

        <FieldGroup>
          <Field data-invalid={Boolean(errors.title)}>
            <FieldLabel htmlFor="title">عنوان خبر</FieldLabel>

            <Input
              id="title"
              {...register("title")}
              aria-invalid={Boolean(errors.title)}
            />

            <FieldError errors={[errors.title]} />
          </Field>

          <Field data-invalid={Boolean(errors.slug)}>
            <FieldLabel htmlFor="slug">اسلاگ</FieldLabel>

            <Input
              id="slug"
              dir="ltr"
              placeholder="cattle-health"
              {...register("slug")}
              aria-invalid={Boolean(errors.slug)}
            />

            <FieldDescription>
              فقط حروف انگلیسی کوچک، عدد و خط تیره
            </FieldDescription>

            <FieldError errors={[errors.slug]} />
          </Field>

          <Field data-invalid={Boolean(errors.category)}>
            <FieldLabel htmlFor="category">دسته‌بندی</FieldLabel>

            <Input
              id="category"
              {...register("category")}
              aria-invalid={Boolean(errors.category)}
            />

            <FieldError errors={[errors.category]} />
          </Field>

          <Field data-invalid={Boolean(errors.excerpt)}>
            <FieldLabel htmlFor="excerpt">خلاصه خبر</FieldLabel>

            <Textarea
              id="excerpt"
              rows={4}
              {...register("excerpt")}
              aria-invalid={Boolean(errors.excerpt)}
            />

            <FieldDescription>
              خلاصه‌ای کوتاه برای نمایش در لیست اخبار
            </FieldDescription>

            <FieldError errors={[errors.excerpt]} />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
