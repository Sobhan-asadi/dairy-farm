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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ProductSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductFormInput = z.input<typeof ProductSchema>;

const productUnits = ["لیتر", "کیلوگرم", "بسته", "رأس", "سرویس"] as const;

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value: string[] | undefined) {
  return value?.join("\n") ?? "";
}

export function ProductBasicFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductFormInput, undefined, ProductFormValues>();

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>اطلاعات اصلی</FieldLegend>

        <FieldGroup>
          <div className="grid gap-5 md:grid-cols-2">
            <Field data-invalid={Boolean(errors.title)}>
              <FieldLabel htmlFor="title">عنوان محصول</FieldLabel>

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
                placeholder="fresh-milk"
                {...register("slug")}
                aria-invalid={Boolean(errors.slug)}
              />

              <FieldDescription>
                حروف انگلیسی کوچک، عدد و خط تیره
              </FieldDescription>

              <FieldError errors={[errors.slug]} />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field data-invalid={Boolean(errors.category)}>
              <FieldLabel htmlFor="category">دسته‌بندی</FieldLabel>

              <Input
                id="category"
                {...register("category")}
                aria-invalid={Boolean(errors.category)}
              />

              <FieldError errors={[errors.category]} />
            </Field>

            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Field data-invalid={Boolean(errors.unit)}>
                  <FieldLabel>واحد</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={Boolean(errors.unit)}
                    >
                      <SelectValue placeholder="انتخاب واحد" />
                    </SelectTrigger>

                    <SelectContent>
                      {productUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError errors={[errors.unit]} />
                </Field>
              )}
            />
          </div>

          <Field data-invalid={Boolean(errors.description)}>
            <FieldLabel htmlFor="description">توضیح کوتاه</FieldLabel>

            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              aria-invalid={Boolean(errors.description)}
            />

            <FieldDescription>
              این متن در معرفی کوتاه محصول استفاده می‌شود.
            </FieldDescription>

            <FieldError errors={[errors.description]} />
          </Field>

          <Controller
            name="longDescription"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.longDescription)}>
                <FieldLabel htmlFor="longDescription">توضیحات کامل</FieldLabel>

                <Textarea
                  id="longDescription"
                  rows={5}
                  value={arrayToLines(field.value)}
                  onChange={(event) =>
                    field.onChange(linesToArray(event.target.value))
                  }
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={Boolean(errors.longDescription)}
                />

                <FieldDescription>
                  هر پاراگراف را در یک خط جدا وارد کنید.
                </FieldDescription>

                <FieldError errors={[errors.longDescription]} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
