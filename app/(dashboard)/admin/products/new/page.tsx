import { ProductForm } from "@/components/admin/products/product-form";
import { requirePermission } from "@/lib/auth/require-permission";

export default async function NewProductPage() {
  await requirePermission("manage-products");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          افزودن محصول جدید
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          اطلاعات محصول یا خدمت جدید را وارد کنید.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
