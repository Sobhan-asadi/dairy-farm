import { requirePermission } from "@/lib/auth/require-permission";

export default async function AdminProductsPage() {
  await requirePermission("manage-products");

  return <h1>مدیریت محصولات</h1>;
}
