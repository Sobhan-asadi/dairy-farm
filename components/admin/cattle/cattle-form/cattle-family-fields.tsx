"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CattleFormValues } from "@/lib/validations/cattle";

export function CattleFamilyFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleFormValues>();

  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">اطلاعات والدین</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          در صورت مشخص بودن، شماره پلاک والدین دام را وارد کنید.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="motherTagNumber">شماره پلاک مادر</Label>

          <Input
            id="motherTagNumber"
            {...register("motherTagNumber")}
            placeholder="اختیاری"
          />

          {errors.motherTagNumber && (
            <p className="text-destructive text-sm">
              {errors.motherTagNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherTagNumber">شماره پلاک پدر</Label>

          <Input
            id="fatherTagNumber"
            {...register("fatherTagNumber")}
            placeholder="اختیاری"
          />

          {errors.fatherTagNumber && (
            <p className="text-destructive text-sm">
              {errors.fatherTagNumber.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
