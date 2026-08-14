import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email("ایمیل واردشده معتبر نیست").trim(),

  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد"),

    email: z.email("ایمیل واردشده معتبر نیست").trim(),

    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.email("ایمیل واردشده معتبر نیست").trim(),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
