"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function HealthFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  return (
    <div className="grid gap-5">
      <div className="space-y-2">
        <Label htmlFor="condition">وضعیت سلامت</Label>

        <Input
          id="condition"
          {...register("condition")}
          placeholder="مثلاً کاهش اشتها"
        />

        {"condition" in errors && errors.condition?.message && (
          <p className="text-destructive text-sm">{errors.condition.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptoms">علائم مشاهده‌شده</Label>

        <Textarea
          id="symptoms"
          {...register("symptoms")}
          rows={4}
          placeholder="علائم مشاهده‌شده را وارد کنید..."
        />

        {"symptoms" in errors && errors.symptoms?.message && (
          <p className="text-destructive text-sm">{errors.symptoms.message}</p>
        )}
      </div>
    </div>
  );
}
