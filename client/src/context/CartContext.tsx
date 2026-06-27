import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { applyConcessionDiscount } from "@shared/scholarship-concessions";
import {
  loadScholarshipFromStorage,
  clearScholarshipStorage,
} from "@/lib/scholarship-storage";

type CartItem = {
  programId: number;
  title: string;
  price: number;
  quantity: number;
};

type AddToCartItem = Omit<CartItem, "quantity"> & { quantity?: number };

export type AppliedScholarship = {
  code: string;
  country: string;
  concessionPercent: number;
  region: "africa" | "asia" | "americas";
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (programId: number) => void;
  updateQuantity: (programId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  scholarship: AppliedScholarship | null;
  applyScholarship: (scholarship: AppliedScholarship) => void;
  clearScholarship: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "edumeup-cart";

function normalizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Partial<CartItem>;
      const programId = Number(record.programId);
      const price = Number(record.price);
      const quantity = Number(record.quantity ?? 1);

      if (!Number.isFinite(programId) || !Number.isFinite(price) || !record.title) {
        return null;
      }

      return {
        programId,
        title: String(record.title),
        price,
        quantity: Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1,
      };
    })
    .filter((item): item is CartItem => Boolean(item));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? normalizeCartItems(JSON.parse(storedCart)) : [];
    } catch {
      return [];
    }
  });
  const [scholarship, setScholarship] = useState<AppliedScholarship | null>(null);

  useEffect(() => {
    const stored = loadScholarshipFromStorage();
    if (stored) {
      setScholarship({
        code: stored.code,
        country: stored.country,
        concessionPercent: stored.concessionPercent,
        region: stored.region,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: AddToCartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.programId === item.programId);
      if (existing) {
        return prev.map((i) =>
          i.programId === item.programId
            ? { ...i, quantity: i.quantity + Math.max(1, item.quantity || 1) }
            : i,
        );
      }
      return [...prev, { ...item, quantity: Math.max(1, item.quantity || 1) }];
    });
  };

  const removeFromCart = (programId: number) => {
    setItems((prev) => prev.filter((i) => i.programId !== programId));
  };

  const updateQuantity = (programId: number, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.programId === programId
            ? { ...item, quantity: Math.max(1, Math.floor(quantity)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const total = useMemo(() => {
    if (!scholarship) return subtotal;
    return applyConcessionDiscount(subtotal, scholarship.concessionPercent);
  }, [subtotal, scholarship]);

  const discount = subtotal - total;

  const applyScholarship = useCallback((next: AppliedScholarship) => {
    setScholarship(next);
  }, []);

  const clearScholarship = useCallback(() => {
    setScholarship(null);
    clearScholarshipStorage();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        total,
        scholarship,
        applyScholarship,
        clearScholarship,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
