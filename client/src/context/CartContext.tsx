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
};

export type AppliedScholarship = {
  code: string;
  country: string;
  concessionPercent: number;
  region: "africa" | "asia" | "americas";
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (programId: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  scholarship: AppliedScholarship | null;
  applyScholarship: (scholarship: AppliedScholarship) => void;
  clearScholarship: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
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

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.programId === item.programId)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (programId: number) => {
    setItems((prev) => prev.filter((i) => i.programId !== programId));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price, 0),
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
        clearCart,
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
