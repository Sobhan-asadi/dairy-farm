"use client";

import { Controller, useFormContext } from "react-hook-form";

import { PersianDateField } from "@/components/shared/persian-date-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  CattleRecordFormInput,
  CattleRecordFormValues,
} from "@/lib/validations/cattle-record";

export function VaccinationFields() {
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
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="vaccineName">نام واکسن</Label>

        <Input
          id="vaccineName"
          {...register("vaccineName")}
          placeholder="مثلاً واکسن تب برفکی"
        />

        {"vaccineName" in errors && errors.vaccineName?.message && (
          <p className="text-destructive text-sm">
            {errors.vaccineName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dose">دوز واکسن</Label>

        <Input
          id="dose"
          {...register("dose")}
          placeholder="مثلاً ۲ میلی‌لیتر"
        />

        {"dose" in errors && errors.dose?.message && (
          <p className="text-destructive text-sm">{errors.dose.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextDoseDate">تاریخ نوبت بعدی</Label>

        <Controller
          name="nextDoseDate"
          control={control}
          render={({ field }) => (
            <PersianDateField
              id="nextDoseDate"
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder="1405-02-01"
            />
          )}
        />

        {"nextDoseDate" in errors && errors.nextDoseDate?.message && (
          <p className="text-destructive text-sm">
            {errors.nextDoseDate.message}
          </p>
        )}
      </div>
    </div>
  );
}
