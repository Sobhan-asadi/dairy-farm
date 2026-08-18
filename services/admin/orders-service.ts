import type {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/order";

export type OrderListParams = {
  page: number;
  pageSize: number;
  search?: string;
  status?: OrderStatus | "all";
  paymentMethod?: PaymentMethod | "all";
  paymentStatus?: PaymentStatus | "all";
};

export type PaginatedOrders = {
  items: Order[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export interface OrdersService {
  getOrders(params: OrderListParams): Promise<PaginatedOrders>;

  getOrderById(id: string): Promise<Order | null>;

  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;

  updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order>;
}
