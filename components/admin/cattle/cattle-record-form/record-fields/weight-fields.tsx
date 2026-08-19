"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function WeightFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="weightKg">وزن دام</Label>

      <div className="relative">
        <Input
          id="weightKg"
          type="number"
          min={0}
          step="0.1"
          {...register("weightKg")}
          placeholder="مثلاً 485"
        />

        <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
          کیلوگرم
        </span>
      </div>

      {"weightKg" in errors && errors.weightKg?.message && (
        <p className="text-destructive text-sm">{errors.weightKg.message}</p>
      )}
    </div>
  );
}
