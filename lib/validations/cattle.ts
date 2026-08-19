import { z } from "zod";

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "فرمت تاریخ نامعتبر است.");

export const CattleSchema = z.object({
  tagNumber: z.string().trim().min(1, "شماره پلاک الزامی است."),

  name: z.string().trim().optional(),

  gender: z.enum(["female", "male"], {
    message: "جنسیت دام را انتخاب کنید.",
  }),

  breed: z.string().trim().min(1, "نژاد دام الزامی است."),

  birthDate: isoDateSchema.optional().or(z.literal("")),

  entryDate: isoDateSchema,

  motherTagNumber: z.string().trim().optional(),

  fatherTagNumber: z.string().trim().optional(),

  status: z.enum(["active", "sold", "dead", "removed"], {
    message: "وضعیت دام را انتخاب کنید.",
  }),

  notes: z
    .string()
    .trim()
    .max(1000, "توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.")
    .optional(),
});

export type CattleFormValues = z.infer<typeof CattleSchema>;
