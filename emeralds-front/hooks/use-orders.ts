import { create } from 'zustand';
import { ProductType } from '@/types/product';

export interface OrderItem {
  product: ProductType;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (items: OrderItem[], total: number) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], paymentId?: string) => void;
  getOrder: (orderId: string) => Order | undefined;
  clearCurrentOrder: () => void;
  clearAllOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  
  createOrder: (items: OrderItem[], total: number) => {
    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set(state => ({
      orders: [...state.orders, order],
      currentOrder: order,
    }));
    
    return order;
  },
  
  updateOrderStatus: (orderId: string, status: Order['status'], paymentId?: string) => {
    set(state => {
      const updatedOrders = state.orders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status, 
              paymentId: paymentId || order.paymentId,
              updatedAt: new Date().toISOString() 
            }
          : order
      );
      
      const updatedCurrentOrder = state.currentOrder?.id === orderId 
        ? { 
            ...state.currentOrder, 
            status, 
            paymentId: paymentId || state.currentOrder.paymentId,
            updatedAt: new Date().toISOString() 
          }
        : state.currentOrder;
      
      return {
        orders: updatedOrders,
        currentOrder: updatedCurrentOrder,
      };
    });
  },
  
  getOrder: (orderId: string) => {
    return get().orders.find(order => order.id === orderId);
  },
  
  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },
  
  clearAllOrders: () => {
    set({ orders: [], currentOrder: null });
  },
})); 