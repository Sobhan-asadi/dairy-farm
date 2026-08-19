"use client";

import { Controller, useFormContext } from "react-hook-form";

import { PersianDateField } from "@/components/shared/persian-date-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CattleFormValues } from "@/lib/validations/cattle";

export function CattleBasicFields() {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CattleFormValues>();

  const gender = watch("gender");

  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">مشخصات پایه دام</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          اطلاعات شناسایی و اولیه دام را وارد کنید.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tagNumber">شماره پلاک</Label>

          <Input
            id="tagNumber"
            {...register("tagNumber")}
            placeholder="مثلاً 1405-001"
          />

          {errors.tagNumber && (
            <p className="text-destructive text-sm">
              {errors.tagNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">نام دام</Label>

          <Input id="name" {...register("name")} placeholder="اختیاری" />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>جنسیت</Label>

          <Select
            value={gender}
            onValueChange={(value) =>
              setValue("gender", value as CattleFormValues["gender"], {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انتخاب جنسیت" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="female">ماده</SelectItem>
              <SelectItem value="male">نر</SelectItem>
            </SelectContent>
          </Select>

          {errors.gender && (
            <p className="text-destructive text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="breed">نژاد</Label>

          <Input
            id="breed"
            {...register("breed")}
            placeholder="مثلاً هلشتاین"
          />

          {errors.breed && (
            <p className="text-destructive text-sm">{errors.breed.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">تاریخ تولد</Label>

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <PersianDateField
                id="birthDate"
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="1405-01-01"
              />
            )}
          />

          {errors.birthDate && (
            <p className="text-destructive text-sm">
              {errors.birthDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="entryDate">تاریخ ورود</Label>

          <Controller
            name="entryDate"
            control={control}
            render={({ field }) => (
              <PersianDateField
                id="entryDate"
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="1405-01-01"
              />
            )}
          />

          {errors.entryDate && (
            <p className="text-destructive text-sm">
              {errors.entryDate.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
