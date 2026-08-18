import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/products/product-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockProductService } from "@/services/admin/mock-product-service";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  await requirePermission("manage-products");

  const { id } = await params;

  const productId = Number.parseInt(id, 10);

  if (!Number.isInteger(productId) || productId < 1) {
    notFound();
  }

  const product = await mockProductService.getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ویرایش محصول</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          اطلاعات «{product.title}» را ویرایش کنید.
        </p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
