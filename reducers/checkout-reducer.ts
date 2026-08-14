import type { CheckoutFormValues } from "@/lib/validations/checkout";
import type { CartItem } from "@/types/cart";
import type { Order, OrderDraft, PaymentMethod } from "@/types/order";

export type CheckoutState = {
  draft: OrderDraft | null;
  completedOrder: Order | null;
};

export type CheckoutAction =
  | {
      type: "START_CHECKOUT";
      payload: {
        items: CartItem[];
        subtotal: number;
      };
    }
  | {
      type: "SET_CUSTOMER";
      payload: CheckoutFormValues;
    }
  | {
      type: "ACCEPT_TERMS";
    }
  | {
      type: "SET_PAYMENT_METHOD";
      payload: PaymentMethod;
    }
  | {
      type: "COMPLETE_ORDER";
      payload: Order;
    }
  | {
      type: "RESET_CHECKOUT";
    };

export const initialCheckoutState: CheckoutState = {
  draft: null,
  completedOrder: null,
};

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case "START_CHECKOUT":
      return {
        draft: {
          items: action.payload.items,
          subtotal: action.payload.subtotal,
          customer: null,
          termsAccepted: false,
          paymentMethod: null,
        },
        completedOrder: null,
      };

    case "SET_CUSTOMER":
      if (!state.draft) {
        return state;
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          customer: action.payload,
        },
      };

    case "ACCEPT_TERMS":
      if (!state.draft) {
        return state;
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          termsAccepted: true,
        },
      };

    case "SET_PAYMENT_METHOD":
      if (!state.draft) {
        return state;
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          paymentMethod: action.payload,
        },
      };

    case "COMPLETE_ORDER":
      return {
        ...state,
        completedOrder: action.payload,
      };

    case "RESET_CHECKOUT":
      return initialCheckoutState;

    default:
      return state;
  }
}
