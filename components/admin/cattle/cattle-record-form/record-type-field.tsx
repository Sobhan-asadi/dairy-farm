"use client";

import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type {
  CattleRecordFormInput,
  CattleRecordFormValues,
} from "@/lib/validations/cattle-record";

const recordTypeLabels = {
  health: "سلامت",
  treatment: "درمان و دارو",
  vaccination: "واکسیناسیون",
  breeding: "تولیدمثل و تلقیح",
  calving: "زایش",
  "milk-production": "تولید شیر",
  weight: "وزن",
} satisfies Record<CattleRecordFormValues["type"], string>;

function getDefaultValuesByType(
  type: CattleRecordFormValues["type"],
  date: string,
  notes: string,
): CattleRecordFormInput {
  switch (type) {
    case "health":
      return {
        type: "health",
        date,
        notes,
        condition: "",
        symptoms: "",
      };

    case "treatment":
      return {
        type: "treatment",
        date,
        notes,
        diagnosis: "",
        medication: "",
        dosage: "",
        veterinarian: "",
      };

    case "vaccination":
      return {
        type: "vaccination",
        date,
        notes,
        vaccineName: "",
        dose: "",
        nextDoseDate: "",
      };

    case "breeding":
      return {
        type: "breeding",
        date,
        notes,
        method: "natural",
        bullTagNumber: "",
        inseminationCode: "",
        result: "pending",
      };

    case "calving":
      return {
        type: "calving",
        date,
        notes,
        calfCount: "",
        liveCalfCount: "",
        complications: "",
      };

    case "milk-production":
      return {
        type: "milk-production",
        date,
        notes,
        amountLiters: "",
      };

    case "weight":
      return {
        type: "weight",
        date,
        notes,
        weightKg: "",
      };
  }
}

export function RecordTypeField() {
  const {
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<
    CattleRecordFormInput,
    undefined,
    CattleRecordFormValues
  >();

  const recordType = watch("type");

  const handleTypeChange = (nextType: CattleRecordFormValues["type"]) => {
    const currentValues = getValues();

    const nextValues = getDefaultValuesByType(
      nextType,
      currentValues.date ?? "",
      currentValues.notes ?? "",
    );

    reset(nextValues);
  };

  return (
    <div className="space-y-2">
      <Label>نوع سابقه</Label>

      <Select
        value={recordType}
        onValueChange={(value) =>
          handleTypeChange(value as CattleRecordFormValues["type"])
        }
      >
        <SelectTrigger className="w-full">
          {recordTypeLabels[recordType]}
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="health">سلامت</SelectItem>

          <SelectItem value="treatment">درمان و دارو</SelectItem>

          <SelectItem value="vaccination">واکسیناسیون</SelectItem>

          <SelectItem value="breeding">تولیدمثل و تلقیح</SelectItem>

          <SelectItem value="calving">زایش</SelectItem>

          <SelectItem value="milk-production">تولید شیر</SelectItem>

          <SelectItem value="weight">وزن</SelectItem>
        </SelectContent>
      </Select>

      {errors.type?.message && (
        <p className="text-destructive text-sm">{errors.type.message}</p>
      )}
    </div>
  );
}
