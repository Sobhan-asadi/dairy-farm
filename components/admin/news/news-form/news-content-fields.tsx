"use client";

import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { NewsFormValues } from "@/lib/validations/news";

function arrayToText(value: string[] | undefined) {
  return value?.join("\n") ?? "";
}

function textToArray(value: string) {
  return value.split("\n");
}

export function NewsContentFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewsFormValues>();

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>متن خبر</FieldLegend>

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.content)}>
              <FieldLabel htmlFor="content">محتوای کامل خبر</FieldLabel>

              <Textarea
                id="content"
                rows={10}
                value={arrayToText(field.value)}
                onChange={(event) => {
                  field.onChange(textToArray(event.target.value));
                }}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={Boolean(errors.content)}
              />

              <FieldDescription>
                هر پاراگراف را در یک خط جدا وارد کنید.
              </FieldDescription>

              <FieldError errors={[errors.content]} />
            </Field>
          )}
        />
      </FieldSet>
    </div>
  );
}
