"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/auth/require-permission";
import { mockProductService } from "@/services/admin/mock-product-service";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/services/admin/product-service";

export async function createProductAction(
  product: CreateProductInput,
): Promise<void> {
  await requirePermission("manage-products");

  await mockProductService.createProduct(product);

  revalidatePath("/admin/products");

  redirect("/admin/products");
}

export async function updateProductAction(
  id: number,
  product: UpdateProductInput,
): Promise<void> {
  await requirePermission("manage-products");

  await mockProductService.updateProduct(id, product);

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);

  redirect("/admin/products");
}

export async function deleteProductAction(id: number): Promise<void> {
  await requirePermission("manage-products");

  await mockProductService.deleteProduct(id);

  revalidatePath("/admin/products");
}
