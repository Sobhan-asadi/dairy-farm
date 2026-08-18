"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { z } from "zod";

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
  ProductSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductFormInput = z.input<typeof ProductSchema>;

export function ProductMediaFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormInput, undefined, ProductFormValues>();

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>تصاویر محصول</FieldLegend>

        <FieldGroup>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.image)}>
                <FieldLabel htmlFor="image">تصویر اصلی</FieldLabel>

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
                  تصویر اصلی محصول را انتخاب کنید. حداکثر حجم ۵ مگابایت.
                </FieldDescription>

                <FieldError errors={[errors.image]} />
              </Field>
            )}
          />

          <Controller
            name="cover"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.cover)}>
                <FieldLabel htmlFor="cover">تصویر کاور</FieldLabel>

                <Input
                  id="cover"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0]);
                  }}
                  aria-invalid={Boolean(errors.cover)}
                />

                <FieldDescription>
                  تصویر بزرگ صفحه جزئیات محصول را انتخاب کنید.
                </FieldDescription>

                <FieldError errors={[errors.cover]} />
              </Field>
            )}
          />

          <Controller
            name="gallery"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.gallery)}>
                <FieldLabel htmlFor="gallery">گالری تصاویر</FieldLabel>

                <Input
                  id="gallery"
                  name={field.name}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onBlur={field.onBlur}
                  ref={field.ref}
                  onChange={(event) => {
                    const selectedFiles = Array.from(event.target.files ?? []);

                    const currentFiles = field.value ?? [];

                    field.onChange([...currentFiles, ...selectedFiles]);

                    event.target.value = "";
                  }}
                  aria-invalid={Boolean(errors.gallery)}
                />

                <FieldDescription>
                  می‌توانید چند تصویر را هم‌زمان یا در چند مرحله انتخاب کنید.
                </FieldDescription>

                {field.value && field.value.length > 0 && (
                  <div className="bg-muted/30 rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      {field.value.length.toLocaleString("fa-IR")} تصویر انتخاب
                      شده
                    </p>

                    <ul className="mt-2 space-y-1">
                      {field.value.map((file, index) => (
                        <li
                          key={`${file.name}-${file.lastModified}-${index}`}
                          className="text-muted-foreground truncate text-xs"
                          dir="ltr"
                        >
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <FieldError errors={[errors.gallery]} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
