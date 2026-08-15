import { z } from "zod";

export const ContactSchema = z.object({
  fullName: z.string().trim().min(2, "نام و نام خانوادگی الزامی است."),

  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید."),

  email: z.email("ایمیل معتبر وارد کنید.").optional().or(z.literal("")),

  subject: z
    .string()
    .trim()
    .min(3, "موضوع پیام الزامی است.")
    .max(100, "موضوع پیام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  message: z
    .string()
    .trim()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد.")
    .max(1500, "متن پیام نمی‌تواند بیشتر از ۱۵۰۰ کاراکتر باشد."),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;
