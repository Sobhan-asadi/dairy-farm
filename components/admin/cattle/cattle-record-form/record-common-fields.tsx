"use client";

import { Controller, useFormContext } from "react-hook-form";

import { PersianDateField } from "@/components/shared/persian-date-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  CattleRecordFormInput,
  CattleRecordFormValues,
} from "@/lib/validations/cattle-record";

export function RecordCommonFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<
    CattleRecordFormInput,
    undefined,
    CattleRecordFormValues
  >();

  return (
    <div className="grid gap-5">
      <div className="space-y-2">
        <Label htmlFor="date">تاریخ ثبت سابقه</Label>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <PersianDateField
              id="date"
              value={field.value}
              onChange={field.onChange}
              placeholder="1405-01-01"
            />
          )}
        />

        {errors.date?.message && (
          <p className="text-destructive text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">یادداشت</Label>

        <Textarea
          id="notes"
          {...register("notes")}
          rows={4}
          placeholder="توضیحات تکمیلی درباره این سابقه..."
        />

        {errors.notes?.message && (
          <p className="text-destructive text-sm">{errors.notes.message}</p>
        )}
      </div>
    </div>
  );
}
