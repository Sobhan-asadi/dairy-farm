import * as z from "zod";

export const Checkout = z.object({
  fullName: z
    .string()
    .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"),

  phone: z
    .string()
    .length(11, "شماره تماس باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره تماس باید با 09 شروع و 11 رقم باشد")
    .nonempty("شماره تماس الزامی است"),

  province: z.string().nonempty("نام استان الزامی است"),

  city: z.string().nonempty("نام شهر الزامی است"),

  postalCode: z
    .string()
    .length(10, "کد پستی باید 10 رقم باشد")
    .regex(/^\d+$/, "کد پستی فقط باید شامل اعداد باشد"),

  address: z.string().min(5, "آدرس نباید کمتر از 5 کاراکتر باشد"),
});

export type CheckoutFormValues = z.infer<typeof Checkout>;
