"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

import {
  createProductAction,
  updateProductAction,
} from "@/actions/admin/products";
import { Button } from "@/components/ui/button";
import {
  ProductSchema,
  type ProductFormValues,
} from "@/lib/validations/product";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/services/admin/product-service";
import type { ProductItem } from "@/types/product";

import { ProductBasicFields } from "./form-sections/product-basic-fields";
import { ProductFeaturesFields } from "./form-sections/product-features-fields";
import { ProductMediaFields } from "./form-sections/product-media-fields";
import { ProductSalesFields } from "./form-sections/product-sales-fields";

type ProductFormInput = z.input<typeof ProductSchema>;

type ProductFormProps = {
  product?: ProductItem;
};

const MOCK_PRODUCT_IMAGE = "/images/products/livestock.webp";

export function ProductForm({ product }: ProductFormProps) {
  const isEditMode = Boolean(product);

  const form = useForm<ProductFormInput, undefined, ProductFormValues>({
    resolver: zodResolver(ProductSchema),

    defaultValues: {
      slug: product?.slug ?? "",
      title: product?.title ?? "",
      description: product?.description ?? "",
      category: product?.category ?? "",
      purchaseType: product?.purchaseType ?? "direct",
      unit: product?.unit ?? "بسته",
      isAvailable: product?.isAvailable ?? true,
      price: product?.price,
      stock: product?.stock,
      longDescription: product?.longDescription ?? [],
      gallery: [],
      features: product?.features ?? [],
      requestFields: product?.requestFields ?? {
        quantity: true,
        breed: false,
        approximateWeight: false,
        description: true,
      },
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ProductFormValues) => {
    const baseProduct = {
      slug: values.slug,
      title: values.title,
      description: values.description,
      longDescription: values.longDescription,
      category: values.category,
      features: values.features,
      unit: values.unit,
      isAvailable: values.isAvailable,
    };

    const image = isEditMode
      ? (product?.image ?? MOCK_PRODUCT_IMAGE)
      : MOCK_PRODUCT_IMAGE;

    const cover = isEditMode
      ? (product?.cover ?? MOCK_PRODUCT_IMAGE)
      : MOCK_PRODUCT_IMAGE;

    const gallery =
      values.gallery.length > 0
        ? values.gallery.map(() => MOCK_PRODUCT_IMAGE)
        : (product?.gallery ?? []);

    if (values.purchaseType === "direct") {
      const productData: CreateProductInput | UpdateProductInput = {
        ...baseProduct,
        image,
        cover,
        gallery,
        purchaseType: "direct",
        price: values.price,
        stock: values.stock,
      };

      if (product) {
        await updateProductAction(product.id, productData);
        return;
      }

      await createProductAction(productData as CreateProductInput);
      return;
    }

    const productData: CreateProductInput | UpdateProductInput = {
      ...baseProduct,
      image,
      cover,
      gallery,
      purchaseType: "request",
      requestFields: values.requestFields,
    };

    if (product) {
      await updateProductAction(product.id, productData);
      return;
    }

    await createProductAction(productData as CreateProductInput);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ProductBasicFields />

        <ProductSalesFields />

        <ProductMediaFields />

        <ProductFeaturesFields />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-36"
          >
            {isSubmitting
              ? isEditMode
                ? "در حال ذخیره..."
                : "در حال ثبت..."
              : isEditMode
                ? "ذخیره تغییرات"
                : "ثبت محصول"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
