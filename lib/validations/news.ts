import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const imageFileSchema = z
  .file("تصویر خبر الزامی است.")
  .max(MAX_IMAGE_SIZE, "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.")
  .mime(ACCEPTED_IMAGE_TYPES, "فرمت تصویر معتبر نیست.");

export const NewsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "عنوان خبر باید حداقل ۵ کاراکتر باشد.")
    .max(150, "عنوان خبر نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد."),

  slug: z
    .string()
    .trim()
    .min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد.")
    .max(100, "اسلاگ نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "اسلاگ فقط می‌تواند شامل حروف انگلیسی کوچک، عدد و خط تیره باشد.",
    ),

  excerpt: z
    .string()
    .trim()
    .min(20, "خلاصه خبر باید حداقل ۲۰ کاراکتر باشد.")
    .max(300, "خلاصه خبر نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد."),

  category: z
    .string()
    .trim()
    .min(2, "دسته‌بندی خبر الزامی است.")
    .max(50, "دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد."),

  content: z
    .array(z.string().trim().min(1, "متن این بخش نمی‌تواند خالی باشد."))
    .min(1, "حداقل یک بخش برای متن خبر وارد کنید."),

  image: imageFileSchema,

  status: z.enum(["draft", "published"]),

  publishedAt: z.string().trim(),
});

export type NewsFormValues = z.infer<typeof NewsSchema>;
