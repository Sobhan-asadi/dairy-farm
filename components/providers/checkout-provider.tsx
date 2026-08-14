"use client";

import type { CheckoutFormValues } from "@/lib/validations/checkout";
import {
  checkoutReducer,
  initialCheckoutState,
  type CheckoutState,
} from "@/reducers/checkout-reducer";
import type { CartItem } from "@/types/cart";
import type { PaymentMethod } from "@/types/order";
import { createContext, useContext, useReducer, type ReactNode } from "react";

type CheckoutContextValue = {
  draft: CheckoutState["draft"];
  completedOrder: CheckoutState["completedOrder"];

  startCheckout: (items: CartItem[], subtotal: number) => void;
  setCustomer: (customer: CheckoutFormValues) => void;
  acceptTerms: () => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  completeOrder: (paymentMethod: PaymentMethod) => void;
  resetCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

type CheckoutProviderProps = {
  children: ReactNode;
};

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [state, dispatch] = useReducer(checkoutReducer, initialCheckoutState);

  const startCheckout = (items: CartItem[], subtotal: number) => {
    dispatch({
      type: "START_CHECKOUT",
      payload: {
        items,
        subtotal,
      },
    });
  };

  const setCustomer = (customer: CheckoutFormValues) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: customer,
    });
  };

  const acceptTerms = () => {
    dispatch({
      type: "ACCEPT_TERMS",
    });
  };

  const setPaymentMethod = (paymentMethod: PaymentMethod) => {
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: paymentMethod,
    });
  };

  const completeOrder = (paymentMethod: PaymentMethod) => {
    const draft = state.draft;

    if (!draft?.customer || !draft.termsAccepted) {
      return;
    }

    dispatch({
      type: "COMPLETE_ORDER",
      payload: {
        id: `DF-${Date.now()}`,
        items: draft.items,
        subtotal: draft.subtotal,
        customer: draft.customer,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  };

  const resetCheckout = () => {
    dispatch({
      type: "RESET_CHECKOUT",
    });
  };

  return (
    <CheckoutContext
      value={{
        draft: state.draft,
        completedOrder: state.completedOrder,
        startCheckout,
        setCustomer,
        acceptTerms,
        setPaymentMethod,
        completeOrder,
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
