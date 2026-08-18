import type { OrdersService } from "@/services/admin/orders-service";
import type { Order } from "@/types/order";

let mockOrders: Order[] = [
  {
    id: "DF-1003",
    items: [
      {
        productId: 2,
        slug: "fresh-milk",
        title: "شیر تازه دامداری",
        image: "/images/products/milk.webp",
        price: 150_000,
        unit: "لیتر",
        quantity: 10,
      },
      {
        productId: 1,
        slug: "livestock",
        title: "دام زنده سالم",
        image: "/images/products/livestock.webp",
        price: 17_000_000,
        unit: "رأس",
        quantity: 1,
      },
    ],
    subtotal: 18_500_000,
    customer: {
      fullName: "علی محمدی",
      phone: "09121234567",
      province: "تهران",
      city: "تهران",
      postalCode: "1234567890",
      address: "تهران",
    },
    paymentMethod: "receipt",
    paymentStatus: "under-review",
    receipt: {
      fileUrl: "/images/receipt-sample.jpg",
      fileName: "receipt-DF-1003.jpg",
      fileType: "image/jpeg",
    },
    status: "under-review",
    createdAt: "2026-08-16T10:30:00.000Z",
  },

  {
    id: "DF-1002",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "رضا احمدی",
      phone: "09123456789",
      province: "شیراز",
      city: "شیراز",
      postalCode: "1234567891",
      address: "شیراز نبش خیابان",
    },
    paymentMethod: "online",
    paymentStatus: "paid",
    status: "under-review",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-1022",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "محمد علی محمدی",
      phone: "09123456789",
      province: "کرمان",
      city: "کرمان",
      postalCode: "1234567891",
      address: "نبش خیابان",
    },
    paymentMethod: "online",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-10022",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "علی اسدی",
      phone: "09123456789",
      province: "لرستان",
      city: "درود",
      postalCode: "1234567891",
      address: "درود لرستان",
    },
    paymentMethod: "online",
    paymentStatus: "paid",
    status: "under-review",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-102",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "سبحان اسدی",
      phone: "09123456789",
      province: "گیلان",
      city: "گیلان",
      postalCode: "1234567891",
      address: "شمال ایران گیلان",
    },
    paymentMethod: "online",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-1802",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "سینا احمدی",
      phone: "09123456789",
      province: "البرز",
      city: "کرج",
      postalCode: "1234567891",
      address: "کرج",
    },
    paymentMethod: "online",
    paymentStatus: "paid",
    status: "under-review",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-17802",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "احمد جعفری",
      phone: "09123456789",
      province: "تهران",
      city: "تهران",
      postalCode: "1234567891",
      address: "رباط کریم",
    },
    paymentMethod: "online",
    paymentStatus: "failed",
    status: "pending",
    createdAt: "2026-08-15T14:20:00.000Z",
  },

  {
    id: "DF-122",
    items: [],
    subtotal: 7_800_000,
    customer: {
      fullName: "رضا اکبری",
      phone: "09123456789",
      province: "تهران",
      city: "پرند",
      postalCode: "1234567891",
      address: "پرند",
    },
    paymentMethod: "online",
    paymentStatus: "awaiting-payment",
    status: "pending",
    createdAt: "2026-08-15T14:20:00.000Z",
  },
];

export const mockOrdersService: OrdersService = {
  async getOrders({
    page,
    pageSize,
    search,
    status = "all",
    paymentMethod = "all",
    paymentStatus = "all",
  }) {
    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredOrders = mockOrders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        order.id.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        order.customer.fullName
          .toLocaleLowerCase("fa-IR")
          .includes(normalizedSearch) ||
        order.customer.phone.includes(normalizedSearch);

      const matchesStatus = status === "all" || order.status === status;

      const matchesPaymentMethod =
        paymentMethod === "all" || order.paymentMethod === paymentMethod;

      const matchesPaymentStatus =
        paymentStatus === "all" || order.paymentStatus === paymentStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesPaymentStatus
      );
    });

    const totalItems = filteredOrders.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;
    const endIndex = startIndex + safePageSize;

    return {
      items: filteredOrders.slice(startIndex, endIndex),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getOrderById(id) {
    return mockOrders.find((order) => order.id === id) ?? null;
  },

  async updateOrderStatus(id, status) {
    const order = mockOrders.find((order) => order.id === id);

    if (!order) {
      throw new Error("سفارش پیدا نشد.");
    }

    const updatedOrder: Order = {
      ...order,
      status,
    };

    mockOrders = mockOrders.map((currentOrder) =>
      currentOrder.id === id ? updatedOrder : currentOrder,
    );

    return updatedOrder;
  },

  async updatePaymentStatus(id, paymentStatus) {
    const order = mockOrders.find((order) => order.id === id);

    if (!order) {
      throw new Error("سفارش پیدا نشد.");
    }

    if (order.paymentMethod !== "receipt") {
      throw new Error("وضعیت پرداخت آنلاین به‌صورت دستی قابل تغییر نیست.");
    }

    const updatedOrder: Order = {
      ...order,
      paymentStatus,
    };

    mockOrders = mockOrders.map((currentOrder) =>
      currentOrder.id === id ? updatedOrder : currentOrder,
    );

    return updatedOrder;
  },
};
