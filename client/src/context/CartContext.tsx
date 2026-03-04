import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  programId: number;
  title: string;
  price: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (programId: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      if (prev.find(i => i.programId === item.programId)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (programId: number) => {
    setItems(prev => prev.filter(i => i.programId !== programId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
