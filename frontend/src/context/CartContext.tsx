import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ProductVariant } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalSavings: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sensation_cart');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isSubscriber } = useAuth();

  useEffect(() => {
    localStorage.setItem('sensation_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    if (variant.stock <= 0 || quantity <= 0) return;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.selectedVariant.id === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = Math.min(updated[existingIndex].quantity + quantity, variant.stock);
        return updated;
      }
      return [...prev, { product, selectedVariant: variant, quantity: Math.min(quantity, variant.stock) }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(item => item.selectedVariant.id !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.selectedVariant.id === variantId ? { ...item, quantity: Math.min(quantity, item.selectedVariant.stock) } : item
    ));
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart.reduce((sum, item) => {
    const unitPrice = isSubscriber ? item.product.subscriberPrice : item.product.regularPrice;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const totalSavings = cart.reduce((sum, item) => {
    if (isSubscriber) {
      const diff = item.product.regularPrice - item.product.subscriberPrice;
      return sum + (diff * item.quantity);
    }
    return sum;
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalAmount,
      totalSavings,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
