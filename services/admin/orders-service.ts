import type { Order } from "@/types/order";

export interface OrdersService {
  getOrders(): Promise<Order[]>;
}
