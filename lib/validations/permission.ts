import { z } from "zod";

export const PermissionSchema = z.enum([
  "view-dashboard",
  "manage-products",
  "manage-orders",
  "manage-users",
  "manage-news",
  "manage-careers",
  "manage-kartaks",
  "manage-permissions",
  "view-analytics",
]);

export const UpdateUserPermissionsSchema = z.object({
  permissions: z.array(PermissionSchema).max(9, "تعداد دسترسی‌ها نامعتبر است."),
});

export type UpdateUserPermissionsFormValues = z.infer<
  typeof UpdateUserPermissionsSchema
>;
