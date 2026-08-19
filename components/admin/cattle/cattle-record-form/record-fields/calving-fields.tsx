"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function CalvingFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="calfCount">تعداد گوساله</Label>

        <Input
          id="calfCount"
          type="number"
          min={1}
          {...register("calfCount")}
          placeholder="مثلاً 1"
        />

        {"calfCount" in errors && errors.calfCount?.message && (
          <p className="text-destructive text-sm">{errors.calfCount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="liveCalfCount">تعداد گوساله زنده</Label>

        <Input
          id="liveCalfCount"
          type="number"
          min={0}
          {...register("liveCalfCount")}
          placeholder="مثلاً 1"
        />

        {"liveCalfCount" in errors && errors.liveCalfCount?.message && (
          <p className="text-destructive text-sm">
            {errors.liveCalfCount.message}
          </p>
        )}
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="complications">عوارض یا توضیحات زایش</Label>

        <Textarea
          id="complications"
          {...register("complications")}
          rows={4}
          placeholder="در صورت وجود، عوارض زایش را وارد کنید..."
        />

        {"complications" in errors && errors.complications?.message && (
          <p className="text-destructive text-sm">
            {errors.complications.message}
          </p>
        )}
      </div>
    </div>
  );
}
