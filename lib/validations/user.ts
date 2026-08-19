import { z } from "zod";

export const UserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.")
    .max(100, "نام و نام خانوادگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  email: z.email("ایمیل معتبر وارد کنید.").trim().toLowerCase(),

  role: z.enum(["customer", "manager", "admin", "kartaks"], {
    message: "نقش کاربر را انتخاب کنید.",
  }),

  status: z.enum(["active", "inactive"], {
    message: "وضعیت کاربر را انتخاب کنید.",
  }),
});

export type UserFormValues = z.infer<typeof UserSchema>;
