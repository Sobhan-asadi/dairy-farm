"use client";

import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CattleFormValues } from "@/lib/validations/cattle";

export function CattleStatusFields() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CattleFormValues>();

  const status = watch("status");

  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">وضعیت دام</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          وضعیت فعلی دام و توضیحات داخلی را مشخص کنید.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label>وضعیت</Label>

          <Select
            value={status}
            onValueChange={(value) =>
              setValue("status", value as CattleFormValues["status"], {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="sold">فروخته‌شده</SelectItem>
              <SelectItem value="dead">تلف‌شده</SelectItem>
              <SelectItem value="removed">حذف از گله</SelectItem>
            </SelectContent>
          </Select>

          {errors.status && (
            <p className="text-destructive text-sm">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">یادداشت داخلی</Label>

          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="توضیحات تکمیلی درباره دام..."
            rows={5}
          />

          {errors.notes && (
            <p className="text-destructive text-sm">{errors.notes.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
