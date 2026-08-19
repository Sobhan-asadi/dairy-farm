"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function MilkProductionFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="amountLiters">مقدار شیر</Label>

      <div className="relative">
        <Input
          id="amountLiters"
          type="number"
          min={0}
          step="0.1"
          {...register("amountLiters")}
          placeholder="مثلاً 31.5"
        />

        <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
          لیتر
        </span>
      </div>

      {"amountLiters" in errors && errors.amountLiters?.message && (
        <p className="text-destructive text-sm">
          {errors.amountLiters.message}
        </p>
      )}
    </div>
  );
}
