import { z } from "zod";

const baseRecordFields = {
  date: z.string().min(1, "تاریخ ثبت سابقه الزامی است."),

  notes: z
    .string()
    .trim()
    .max(1000, "یادداشت نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.")
    .optional(),
};

const HealthRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("health"),

  condition: z.string().trim().min(1, "وضعیت سلامت الزامی است."),

  symptoms: z.string().trim().optional(),
});

const TreatmentRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("treatment"),

  diagnosis: z.string().trim().min(1, "تشخیص الزامی است."),

  medication: z.string().trim().optional(),

  dosage: z.string().trim().optional(),

  veterinarian: z.string().trim().optional(),
});

const VaccinationRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("vaccination"),

  vaccineName: z.string().trim().min(1, "نام واکسن الزامی است."),

  dose: z.string().trim().optional(),

  nextDoseDate: z.string().optional(),
});

const BreedingRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("breeding"),

  method: z.enum(["natural", "artificial-insemination"]),

  bullTagNumber: z.string().trim().optional(),

  inseminationCode: z.string().trim().optional(),

  result: z.enum(["pending", "pregnant", "not-pregnant"]),
});

const CalvingRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("calving"),

  calfCount: z.coerce.number().int().min(1, "تعداد گوساله باید حداقل ۱ باشد."),

  liveCalfCount: z.coerce
    .number()
    .int()
    .min(0, "تعداد گوساله زنده نمی‌تواند منفی باشد."),

  complications: z.string().trim().optional(),
});

const MilkProductionRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("milk-production"),

  amountLiters: z.coerce.number().positive("مقدار شیر باید بیشتر از صفر باشد."),
});

const WeightRecordSchema = z.object({
  ...baseRecordFields,
  type: z.literal("weight"),

  weightKg: z.coerce.number().positive("وزن باید بیشتر از صفر باشد."),
});

export const CattleRecordSchema = z.discriminatedUnion("type", [
  HealthRecordSchema,
  TreatmentRecordSchema,
  VaccinationRecordSchema,
  BreedingRecordSchema,
  CalvingRecordSchema,
  MilkProductionRecordSchema,
  WeightRecordSchema,
]);

export type CattleRecordFormInput = z.input<typeof CattleRecordSchema>;

export type CattleRecordFormValues = z.infer<typeof CattleRecordSchema>;
