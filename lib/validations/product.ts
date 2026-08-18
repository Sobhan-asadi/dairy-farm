import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const optionalNumber = z.preprocess((value) => {
  if (
    value === "" ||
    value === undefined ||
    value === null ||
    (typeof value === "number" && Number.isNaN(value))
  ) {
    return undefined;
  }

  return value;
}, z.number().optional());

const imageFileSchema = z
  .file("تصویر الزامی است.")
  .max(MAX_IMAGE_SIZE, "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.")
  .mime(ACCEPTED_IMAGE_TYPES, "فرمت تصویر معتبر نیست.");

const requestFieldsSchema = z.object({
  quantity: z.boolean(),
  breed: z.boolean(),
  approximateWeight: z.boolean(),
  description: z.boolean(),
});

const baseProductSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "اسلاگ الزامی است.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "اسلاگ فقط باید شامل حروف انگلیسی کوچک، عدد و خط تیره باشد.",
    ),

  title: z.string().trim().min(2, "عنوان محصول الزامی است."),

  description: z
    .string()
    .trim()
    .min(10, "توضیح کوتاه محصول باید حداقل ۱۰ کاراکتر باشد."),

  category: z.string().trim().min(2, "دسته‌بندی الزامی است."),

  image: imageFileSchema,

  cover: imageFileSchema,

  unit: z.enum(["لیتر", "کیلوگرم", "بسته", "رأس", "سرویس"]),

  isAvailable: z.boolean(),

  longDescription: z.array(z.string().trim().min(1)).default([]),

  gallery: z.array(imageFileSchema).default([]),

  features: z.array(z.string().trim().min(1)).default([]),
});

const directProductSchema = baseProductSchema.extend({
  purchaseType: z.literal("direct"),

  price: z.number().positive("قیمت باید بیشتر از صفر باشد."),

  stock: z
    .number()
    .int("موجودی باید عدد صحیح باشد.")
    .min(0, "موجودی نمی‌تواند منفی باشد."),

  requestFields: requestFieldsSchema.optional(),
});

const requestProductSchema = baseProductSchema.extend({
  purchaseType: z.literal("request"),

  price: optionalNumber,

  stock: optionalNumber,

  requestFields: requestFieldsSchema,
});

export const ProductSchema = z.discriminatedUnion("purchaseType", [
  directProductSchema,
  requestProductSchema,
]);

export type ProductFormValues = z.infer<typeof ProductSchema>;
