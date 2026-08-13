"use client";

import type { CheckoutFormValues } from "@/lib/validations/checkout";
import { createContext, useContext, useState, type ReactNode } from "react";

export type PaymentMethod = "online" | "receipt";

export type LastOrder = {
  orderId: string;
  paymentMethod: PaymentMethod;
};

type CheckoutContextValue = {
  customer: CheckoutFormValues | null;
  hasAcceptedTerms: boolean;
  lastOrder: LastOrder | null;

  setCustomer: (customer: CheckoutFormValues) => void;
  acceptTerms: () => void;
  createOrder: (paymentMethod: PaymentMethod) => void;
  resetCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

type CheckoutProviderProps = {
  children: ReactNode;
};

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [customer, setCustomer] = useState<CheckoutFormValues | null>(null);

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);

  const acceptTerms = () => {
    setHasAcceptedTerms(true);
  };

  const createOrder = (paymentMethod: PaymentMethod) => {
    setLastOrder({
      orderId: `DF-${Date.now()}`,
      paymentMethod,
    });
  };

  const resetCheckout = () => {
    setCustomer(null);
    setHasAcceptedTerms(false);
    setLastOrder(null);
  };

  return (
    <CheckoutContext
      value={{
        customer,
        hasAcceptedTerms,
        lastOrder,
        setCustomer,
        acceptTerms,
        createOrder,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  return context;
}
