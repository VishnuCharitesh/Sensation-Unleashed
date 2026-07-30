import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (cartItems: CartItem[], customerId: string, customerEmail: string, customerName: string, isSubscriber: boolean, paymentMethod: 'UPI' | 'CARD' | 'NETBANKING') => Order;
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: string, paymentStatus?: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sensation_orders');
    if (saved) {
      try {
        return JSON.parse(saved) as Order[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('sensation_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (cartItems: CartItem[], customerId: string, customerEmail: string, customerName: string, isSubscriber: boolean, paymentMethod: 'UPI' | 'CARD' | 'NETBANKING') => {
    const orderId = `ORDER-${Date.now()}`;
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const items = cartItems.map((item) => {
      const unitPrice = isSubscriber ? item.product.subscriberPrice : item.product.regularPrice;
      const regularPrice = item.product.regularPrice;
      const subtotal = item.quantity * unitPrice;
      const discountAmount = isSubscriber ? (regularPrice - unitPrice) * item.quantity : 0;

      return {
        id: item.selectedVariant.id,
        productName: item.product.name,
        size: item.selectedVariant.size,
        color: item.selectedVariant.color,
        quantity: item.quantity,
        regularPrice,
        unitPrice,
        discountAmount,
        subtotal
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = items.reduce((sum, item) => sum + item.discountAmount, 0);
    const finalAmount = totalAmount;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerId,
      customerEmail,
      totalAmount,
      discountAmount,
      finalAmount,
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod,
      shippingAddress: customerName,
      isSubscriberOrder: isSubscriber,
      createdAt: new Date().toISOString(),
      items
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrders = () => orders;

  const updateOrderStatus = (orderId: string, status: string, paymentStatus?: string) => {
    setOrders((prev) => prev.map((order) => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        orderStatus: status,
        paymentStatus: paymentStatus ?? order.paymentStatus
      };
    }));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
}
