/** @format */

"use client";

import type { CartItem } from "@/types/cart";
import type { ProductItem } from "@/types/product";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  isInitialized: boolean;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: ProductItem, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "dairy-farm-cart";

function readStoredCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setItems(readStoredCart());
      setIsInitialized(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isInitialized]);

  const addItem = useCallback((product: ProductItem, quantity: number) => {
    if (
      product.purchaseType !== "direct" ||
      !product.isAvailable ||
      typeof product.price !== "number" ||
      quantity < 1
    ) {
      return;
    }

    // بعد از این بررسی، price یک number قطعی است.
    const productPrice = product.price;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.image,
        price: productPrice,
        unit: product.unit,
        quantity,
      };

      return [...currentItems, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isInitialized,
    }),
    [
      items,
      totalItems,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isInitialized,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
