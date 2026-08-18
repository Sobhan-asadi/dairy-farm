"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { z } from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  ProductSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductFormInput = z.input<typeof ProductSchema>;

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value: string[] | undefined) {
  return value?.join("\n") ?? "";
}

export function ProductFeaturesFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormInput, undefined, ProductFormValues>();

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>ویژگی‌های محصول</FieldLegend>

        <Controller
          name="features"
          control={control}
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.features)}>
              <FieldLabel htmlFor="features">ویژگی‌ها</FieldLabel>

              <Textarea
                id="features"
                rows={5}
                value={arrayToLines(field.value)}
                onChange={(event) =>
                  field.onChange(linesToArray(event.target.value))
                }
                onBlur={field.onBlur}
                ref={field.ref}
                placeholder={"کنترل کیفیت\nتولید روزانه\nامکان سفارش عمده"}
                aria-invalid={Boolean(errors.features)}
              />

              <FieldDescription>
                هر ویژگی را در یک خط جدا وارد کنید.
              </FieldDescription>

              <FieldError errors={[errors.features]} />
            </Field>
          )}
        />
      </FieldSet>
    </div>
  );
}
