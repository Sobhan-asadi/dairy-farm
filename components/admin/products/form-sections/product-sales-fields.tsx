"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import {
  ProductSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductFormInput = z.input<typeof ProductSchema>;

export function ProductSalesFields() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormInput, undefined, ProductFormValues>();

  const purchaseType = watch("purchaseType");

  return (
    <div className="bg-card rounded-xl border p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>فروش و موجودی</FieldLegend>

        <FieldGroup>
          <Controller
            name="purchaseType"
            control={control}
            render={({ field }) => (
              <Field data-invalid={Boolean(errors.purchaseType)}>
                <FieldLabel>نوع فروش</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={Boolean(errors.purchaseType)}
                  >
                    <SelectValue placeholder="انتخاب نوع فروش" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="direct">خرید مستقیم</SelectItem>
                    <SelectItem value="request">ثبت درخواست</SelectItem>
                  </SelectContent>
                </Select>

                <FieldDescription>
                  خرید مستقیم برای محصولات دارای قیمت و موجودی است؛ ثبت درخواست
                  برای مواردی است که نیاز به بررسی و هماهنگی دارند.
                </FieldDescription>

                <FieldError errors={[errors.purchaseType]} />
              </Field>
            )}
          />

          {purchaseType === "direct" && (
            <div className="grid gap-5 md:grid-cols-2">
              <Field data-invalid={Boolean(errors.price)}>
                <FieldLabel htmlFor="price">قیمت</FieldLabel>

                <Input
                  id="price"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  {...register("price", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  aria-invalid={Boolean(errors.price)}
                />

                <FieldDescription>مبلغ به تومان</FieldDescription>

                <FieldError errors={[errors.price]} />
              </Field>

              <Field data-invalid={Boolean(errors.stock)}>
                <FieldLabel htmlFor="stock">موجودی</FieldLabel>

                <Input
                  id="stock"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  {...register("stock", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  aria-invalid={Boolean(errors.stock)}
                />

                <FieldError errors={[errors.stock]} />
              </Field>
            </div>
          )}

          {purchaseType === "request" && (
            <FieldSet className="rounded-lg border p-4">
              <FieldLegend variant="label">
                اطلاعات موردنیاز از متقاضی
              </FieldLegend>

              <FieldDescription>
                مشخص کنید هنگام ثبت درخواست چه اطلاعاتی از مشتری دریافت شود.
              </FieldDescription>

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <Controller
                  name="requestFields.quantity"
                  control={control}
                  render={({ field }) => (
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>تعداد</span>
                      </Field>
                    </FieldLabel>
                  )}
                />

                <Controller
                  name="requestFields.breed"
                  control={control}
                  render={({ field }) => (
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>نژاد</span>
                      </Field>
                    </FieldLabel>
                  )}
                />

                <Controller
                  name="requestFields.approximateWeight"
                  control={control}
                  render={({ field }) => (
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>وزن تقریبی</span>
                      </Field>
                    </FieldLabel>
                  )}
                />

                <Controller
                  name="requestFields.description"
                  control={control}
                  render={({ field }) => (
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>توضیحات</span>
                      </Field>
                    </FieldLabel>
                  )}
                />
              </div>

              <FieldError errors={[errors.requestFields]} />
            </FieldSet>
          )}

          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between rounded-lg border p-4"
              >
                <div className="min-w-0 flex-1">
                  <FieldLabel htmlFor="isAvailable">
                    {field.value ? "محصول فعال است" : "محصول غیرفعال است"}
                  </FieldLabel>

                  <FieldDescription>
                    {field.value
                      ? "محصول در سایت قابل نمایش و عرضه است."
                      : "محصول در حال حاضر برای عرضه غیرفعال است."}
                  </FieldDescription>
                </div>

                <Switch
                  id="isAvailable"
                  dir="ltr"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="وضعیت محصول"
                />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
