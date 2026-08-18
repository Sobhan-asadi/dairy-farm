import type { CheckoutFormValues } from "@/lib/validations/checkout";
import type { CartItem } from "@/types/cart";

export type PaymentMethod = "online" | "receipt";

export type PaymentStatus =
  "awaiting-payment" | "under-review" | "paid" | "failed";

export type OrderStatus =
  "pending" | "under-review" | "completed" | "cancelled";

export type PaymentReceipt = {
  fileUrl: string;
  fileName: string;
  fileType: string;
};

export type OrderDraft = {
  items: CartItem[];
  subtotal: number;
  customer: CheckoutFormValues | null;
  termsAccepted: boolean;
  paymentMethod: PaymentMethod | null;
};

type BaseOrder = {
  id: string;
  items: CartItem[];
  subtotal: number;
  customer: CheckoutFormValues;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type OnlinePaymentOrder = BaseOrder & {
  paymentMethod: "online";
  receipt?: never;
};

export type ReceiptPaymentOrder = BaseOrder & {
  paymentMethod: "receipt";
  receipt: PaymentReceipt;
};

export type Order = OnlinePaymentOrder | ReceiptPaymentOrder;
