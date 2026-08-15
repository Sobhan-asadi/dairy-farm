import { z } from "zod";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const CareerSchema = z.object({
  fullName: z.string().trim().min(2, "نام و نام خانوادگی الزامی است."),

  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید."),

  email: z.email("ایمیل معتبر وارد کنید.").optional().or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(1000, "متن توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.")
    .optional(),

  resume: z
    .instanceof(File, {
      message: "ارسال رزومه الزامی است.",
    })
    .refine(
      (file) => file.size <= MAX_RESUME_SIZE,
      "حجم رزومه نباید بیشتر از ۵ مگابایت باشد.",
    )
    .refine(
      (file) => ALLOWED_RESUME_TYPES.includes(file.type),
      "فرمت رزومه باید PDF، DOC یا DOCX باشد.",
    ),
});

export type CareerFormValues = z.infer<typeof CareerSchema>;
