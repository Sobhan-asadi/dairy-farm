import type { ProductItem, PurchaseType } from "@/types/product";

export type ProductAvailability = "all" | "available" | "unavailable";

export type ProductListParams = {
  page: number;
  pageSize: number;
  search?: string;
  purchaseType?: PurchaseType | "all";
  availability?: ProductAvailability;
};

export type PaginatedProducts = {
  items: ProductItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CreateProductInput = Omit<ProductItem, "id">;

export type UpdateProductInput = Partial<Omit<ProductItem, "id">>;

export interface ProductService {
  getProducts(params: ProductListParams): Promise<PaginatedProducts>;
  getProductById(id: number): Promise<ProductItem | null>;
  createProduct(data: CreateProductInput): Promise<ProductItem>;
  updateProduct(id: number, data: UpdateProductInput): Promise<ProductItem>;
  deleteProduct(id: number): Promise<void>;
}
