import type { CheckoutFormValues } from "@/lib/validations/checkout";
import type { CartItem } from "@/types/cart";

export type PaymentMethod = "online" | "receipt";

export type OrderStatus =
  | "pending"
  | "awaiting-payment"
  | "paid"
  | "under-review"
  | "completed"
  | "cancelled";

export type OrderDraft = {
  items: CartItem[];
  subtotal: number;
  customer: CheckoutFormValues | null;
  termsAccepted: boolean;
  paymentMethod: PaymentMethod | null;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  customer: CheckoutFormValues;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
};
