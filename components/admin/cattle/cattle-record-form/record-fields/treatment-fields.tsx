"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function TreatmentFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="diagnosis">تشخیص</Label>

        <Input
          id="diagnosis"
          {...register("diagnosis")}
          placeholder="مثلاً عفونت تنفسی"
        />

        {"diagnosis" in errors && errors.diagnosis?.message && (
          <p className="text-destructive text-sm">{errors.diagnosis.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="medication">دارو</Label>

        <Input
          id="medication"
          {...register("medication")}
          placeholder="نام دارو"
        />

        {"medication" in errors && errors.medication?.message && (
          <p className="text-destructive text-sm">
            {errors.medication.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dosage">دوز مصرف</Label>

        <Input
          id="dosage"
          {...register("dosage")}
          placeholder="مثلاً ۵ میلی‌لیتر"
        />

        {"dosage" in errors && errors.dosage?.message && (
          <p className="text-destructive text-sm">{errors.dosage.message}</p>
        )}
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="veterinarian">دامپزشک</Label>

        <Input
          id="veterinarian"
          {...register("veterinarian")}
          placeholder="نام دامپزشک"
        />

        {"veterinarian" in errors && errors.veterinarian?.message && (
          <p className="text-destructive text-sm">
            {errors.veterinarian.message}
          </p>
        )}
      </div>
    </div>
  );
}
