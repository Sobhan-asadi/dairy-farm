import type { OrdersService } from "@/services/admin/orders-service";
import type { Order } from "@/types/order";

const mockOrders: Order[] = [
  {
    id: "DF-1003",
    items: [],
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
      province: "البرز",
      city: "کرج",
      postalCode: "1234567891",
      address: "کرج",
    },
    paymentMethod: "online",
    status: "paid",
    createdAt: "2026-08-15T14:20:00.000Z",
  },
];

export const mockOrdersService: OrdersService = {
  async getOrders() {
    return mockOrders;
  },
};
