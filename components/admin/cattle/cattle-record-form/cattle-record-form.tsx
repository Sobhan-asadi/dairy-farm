"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import {
  createCattleRecordAction,
  updateCattleRecordAction,
} from "@/actions/admin/cattle";
import { Button } from "@/components/ui/button";
import {
  CattleRecordSchema,
  type CattleRecordFormValues,
} from "@/lib/validations/cattle-record";
import type { CattleRecord } from "@/types/cattle-record";

import { RecordCommonFields } from "./record-common-fields";
import { BreedingFields } from "./record-fields/breeding-fields";
import { CalvingFields } from "./record-fields/calving-fields";
import { HealthFields } from "./record-fields/health-fields";
import { MilkProductionFields } from "./record-fields/milk-production-fields";
import { TreatmentFields } from "./record-fields/treatment-fields";
import { VaccinationFields } from "./record-fields/vaccination-fields";
import { WeightFields } from "./record-fields/weight-fields";
import { RecordTypeField } from "./record-type-field";

type CattleRecordFormInput = z.input<typeof CattleRecordSchema>;

type CattleRecordFormProps = {
  cattleId: string;
  record?: CattleRecord;
};

function getDefaultValues(record?: CattleRecord): CattleRecordFormInput {
  if (!record) {
    return {
      type: "health",
      date: "",
      notes: "",
      condition: "",
      symptoms: "",
    };
  }

  switch (record.type) {
    case "health":
      return {
        type: "health",
        date: record.date,
        notes: record.notes ?? "",
        condition: record.condition,
        symptoms: record.symptoms ?? "",
      };

    case "treatment":
      return {
        type: "treatment",
        date: record.date,
        notes: record.notes ?? "",
        diagnosis: record.diagnosis,
        medication: record.medication ?? "",
        dosage: record.dosage ?? "",
        veterinarian: record.veterinarian ?? "",
      };

    case "vaccination":
      return {
        type: "vaccination",
        date: record.date,
        notes: record.notes ?? "",
        vaccineName: record.vaccineName,
        dose: record.dose ?? "",
        nextDoseDate: record.nextDoseDate ?? "",
      };

    case "breeding":
      return {
        type: "breeding",
        date: record.date,
        notes: record.notes ?? "",
        method: record.method,
        bullTagNumber: record.bullTagNumber ?? "",
        inseminationCode: record.inseminationCode ?? "",
        result: record.result,
      };

    case "calving":
      return {
        type: "calving",
        date: record.date,
        notes: record.notes ?? "",
        calfCount: record.calfCount,
        liveCalfCount: record.liveCalfCount,
        complications: record.complications ?? "",
      };

    case "milk-production":
      return {
        type: "milk-production",
        date: record.date,
        notes: record.notes ?? "",
        amountLiters: record.amountLiters,
      };

    case "weight":
      return {
        type: "weight",
        date: record.date,
        notes: record.notes ?? "",
        weightKg: record.weightKg,
      };
  }
}

export function CattleRecordForm({ cattleId, record }: CattleRecordFormProps) {
  const isEditMode = Boolean(record);

  const form = useForm<
    CattleRecordFormInput,
    undefined,
    CattleRecordFormValues
  >({
    resolver: zodResolver(CattleRecordSchema),
    defaultValues: getDefaultValues(record),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const recordType = useWatch({
    control,
    name: "type",
  });

  const onSubmit = async (values: CattleRecordFormValues) => {
    const submitRecord = async (
      data: Parameters<typeof createCattleRecordAction>[1],
    ) => {
      if (record) {
        await updateCattleRecordAction(cattleId, record.id, data);

        return;
      }

      await createCattleRecordAction(cattleId, data);
    };

    switch (values.type) {
      case "health":
        await submitRecord({
          ...values,
          symptoms: values.symptoms || null,
          notes: values.notes || null,
        });
        return;

      case "treatment":
        await submitRecord({
          ...values,
          medication: values.medication || null,
          dosage: values.dosage || null,
          veterinarian: values.veterinarian || null,
          notes: values.notes || null,
        });
        return;

      case "vaccination":
        await submitRecord({
          ...values,
          dose: values.dose || null,
          nextDoseDate: values.nextDoseDate || null,
          notes: values.notes || null,
        });
        return;

      case "breeding":
        await submitRecord({
          ...values,
          bullTagNumber: values.bullTagNumber || null,
          inseminationCode: values.inseminationCode || null,
          notes: values.notes || null,
        });
        return;

      case "calving":
        await submitRecord({
          ...values,
          complications: values.complications || null,
          notes: values.notes || null,
        });
        return;

      case "milk-production":
        await submitRecord({
          ...values,
          notes: values.notes || null,
        });
        return;

      case "weight":
        await submitRecord({
          ...values,
          notes: values.notes || null,
        });
        return;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="bg-card rounded-xl border p-5 sm:p-6">
          <div>
            <h2 className="font-semibold">نوع سابقه</h2>

            <p className="text-muted-foreground mt-1 text-sm">
              نوع اطلاعاتی که می‌خواهید در کارتکس ثبت شود را انتخاب کنید.
            </p>
          </div>

          <div className="mt-6">
            <RecordTypeField />
          </div>
        </section>

        <section className="bg-card rounded-xl border p-5 sm:p-6">
          <div>
            <h2 className="font-semibold">اطلاعات سابقه</h2>

            <p className="text-muted-foreground mt-1 text-sm">
              اطلاعات مربوط به سابقه انتخاب‌شده را وارد کنید.
            </p>
          </div>

          <div className="mt-6">
            {recordType === "health" && <HealthFields />}

            {recordType === "treatment" && <TreatmentFields />}

            {recordType === "vaccination" && <VaccinationFields />}

            {recordType === "breeding" && <BreedingFields />}

            {recordType === "calving" && <CalvingFields />}

            {recordType === "milk-production" && <MilkProductionFields />}

            {recordType === "weight" && <WeightFields />}
          </div>
        </section>

        <section className="bg-card rounded-xl border p-5 sm:p-6">
          <RecordCommonFields />
        </section>

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
                : "ثبت سابقه"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
