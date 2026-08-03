export type PurchaseType = "direct" | "request";

export type ProductUnit = "لیتر" | "کیلوگرم" | "بسته" | "رأس" | "سرویس";

export type ProductItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string[];
  category: string;
  image: string;
  cover: string;
  gallery: string[];
  features: string[];

  purchaseType: PurchaseType;
  unit: ProductUnit;
  isAvailable: boolean;

  price?: number;
  stock?: number;

  requestFields?: {
    quantity: boolean;
    breed: boolean;
    approximateWeight: boolean;
    description: boolean;
  };
};
