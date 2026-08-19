"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { createCattleAction, updateCattleAction } from "@/actions/admin/cattle";
import { Button } from "@/components/ui/button";
import { CattleSchema, type CattleFormValues } from "@/lib/validations/cattle";
import type {
  CreateCattleInput,
  UpdateCattleInput,
} from "@/services/cattle/cattle-service";
import type { Cattle } from "@/types/cattle";

import { CattleBasicFields } from "./cattle-basic-fields";
import { CattleFamilyFields } from "./cattle-family-fields";
import { CattleStatusFields } from "./cattle-status-fields";

type CattleFormProps = {
  cattle?: Cattle;
};

export function CattleForm({ cattle }: CattleFormProps) {
  const isEditMode = Boolean(cattle);

  const form = useForm<CattleFormValues>({
    resolver: zodResolver(CattleSchema),

    defaultValues: {
      tagNumber: cattle?.tagNumber ?? "",
      name: cattle?.name ?? "",
      gender: cattle?.gender ?? "female",
      breed: cattle?.breed ?? "",
      birthDate: cattle?.birthDate ?? "",
      entryDate: cattle?.entryDate ?? "",
      motherTagNumber: cattle?.motherTagNumber ?? "",
      fatherTagNumber: cattle?.fatherTagNumber ?? "",
      status: cattle?.status ?? "active",
      notes: cattle?.notes ?? "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CattleFormValues) => {
    const baseCattle = {
      tagNumber: values.tagNumber,
      name: values.name || null,
      gender: values.gender,
      breed: values.breed,
      birthDate: values.birthDate || null,
      entryDate: values.entryDate,
      motherTagNumber: values.motherTagNumber || null,
      fatherTagNumber: values.fatherTagNumber || null,
      status: values.status,
      notes: values.notes || null,
    };

    if (cattle) {
      const updatedCattle: UpdateCattleInput = baseCattle;

      const result = await updateCattleAction(cattle.id, updatedCattle);

      if (!result.success) {
        setError("tagNumber", {
          type: "server",
          message: result.message,
        });

        return;
      }

      return;
    }

    const newCattle: CreateCattleInput = baseCattle;

    const result = await createCattleAction(newCattle);

    if (!result.success) {
      setError("tagNumber", {
        type: "server",
        message: result.message,
      });

      return;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CattleBasicFields />

        <CattleFamilyFields />

        <CattleStatusFields />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-36"
          >
            {isSubmitting
              ? isEditMode
                ? "در حال ذخیره..."
                : "در حال ثبت..."
              : isEditMode
                ? "ذخیره تغییرات"
                : "ثبت دام"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
