"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CattleRecordFormValues } from "@/lib/validations/cattle-record";

export function BreedingFields() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CattleRecordFormValues>();

  const method = watch("method");
  const result = watch("result");

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>روش تولیدمثل</Label>

        <Select
          value={method}
          onValueChange={(value) =>
            setValue("method", value as "natural" | "artificial-insemination", {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب روش" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="natural">جفت‌گیری طبیعی</SelectItem>

            <SelectItem value="artificial-insemination">
              تلقیح مصنوعی
            </SelectItem>
          </SelectContent>
        </Select>

        {"method" in errors && errors.method?.message && (
          <p className="text-destructive text-sm">{errors.method.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>نتیجه</Label>

        <Select
          value={result}
          onValueChange={(value) =>
            setValue(
              "result",
              value as "pending" | "pregnant" | "not-pregnant",
              {
                shouldDirty: true,
                shouldValidate: true,
              },
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب نتیجه" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="pending">در انتظار بررسی</SelectItem>

            <SelectItem value="pregnant">آبستن</SelectItem>

            <SelectItem value="not-pregnant">آبستن نشده</SelectItem>
          </SelectContent>
        </Select>

        {"result" in errors && errors.result?.message && (
          <p className="text-destructive text-sm">{errors.result.message}</p>
        )}
      </div>

      {method === "natural" && (
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="bullTagNumber">شماره پلاک گاو نر</Label>

          <Input
            id="bullTagNumber"
            {...register("bullTagNumber")}
            placeholder="شماره پلاک دام نر"
          />

          {"bullTagNumber" in errors && errors.bullTagNumber?.message && (
            <p className="text-destructive text-sm">
              {errors.bullTagNumber.message}
            </p>
          )}
        </div>
      )}

      {method === "artificial-insemination" && (
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="inseminationCode">کد تلقیح</Label>

          <Input
            id="inseminationCode"
            {...register("inseminationCode")}
            placeholder="کد یا شناسه تلقیح"
          />

          {"inseminationCode" in errors && errors.inseminationCode?.message && (
            <p className="text-destructive text-sm">
              {errors.inseminationCode.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
