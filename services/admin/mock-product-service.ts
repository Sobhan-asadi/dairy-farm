import { products } from "@/constants/products";
import type {
  CreateProductInput,
  ProductService,
  UpdateProductInput,
} from "@/services/admin/product-service";
import type { ProductItem } from "@/types/product";

let mockProducts: ProductItem[] = structuredClone(products);

export const mockProductService: ProductService = {
  async getProducts({
    page,
    pageSize,
    search,
    purchaseType = "all",
    availability = "all",
  }) {
    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredProducts = mockProducts.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        product.category.toLocaleLowerCase("fa-IR").includes(normalizedSearch);

      const matchesPurchaseType =
        purchaseType === "all" || product.purchaseType === purchaseType;

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && product.isAvailable) ||
        (availability === "unavailable" && !product.isAvailable);

      return matchesSearch && matchesPurchaseType && matchesAvailability;
    });

    const totalItems = filteredProducts.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;
    const endIndex = startIndex + safePageSize;

    return {
      items: filteredProducts.slice(startIndex, endIndex),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getProductById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },

  async createProduct(data: CreateProductInput) {
    const nextId =
      mockProducts.length > 0
        ? Math.max(...mockProducts.map((product) => product.id)) + 1
        : 1;

    const newProduct: ProductItem = {
      id: nextId,
      ...data,
    };

    mockProducts = [...mockProducts, newProduct];

    return newProduct;
  },

  async updateProduct(id: number, data: UpdateProductInput) {
    const productIndex = mockProducts.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("محصول پیدا نشد.");
    }

    const updatedProduct: ProductItem = {
      ...mockProducts[productIndex],
      ...data,
      id,
    };

    mockProducts = mockProducts.map((product) =>
      product.id === id ? updatedProduct : product,
    );

    return updatedProduct;
  },

  async deleteProduct(id: number) {
    mockProducts = mockProducts.filter((product) => product.id !== id);
  },
};
