import { create } from 'zustand';
import { ProductType } from '@/types/product';

export interface OrderItem {
  product: ProductType;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  orderId?: string; // Para formato personalizado
  id?: string; // Para formato Spring Boot
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'processing';
  total: number;
  currency: string;
  paymentMethod: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentDetails?: {
    transactionId: string;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
  };
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  createOrder: (items: OrderItem[], total: number, paymentMethod: string) => Promise<Order>;
  fetchOrders: (page?: number, limit?: number, status?: string) => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: Order['status'], paymentId?: string) => Promise<void>;
  clearCurrentOrder: () => void;
  clearError: () => void;
}

// API Base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage')!).state.token 
      : null;
  }
  return null;
};

// API functions
const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  async fetchOrders(page = 1, limit = 10, status = 'all') {
    return this.request(`/orders?page=${page}&limit=${limit}&status=${status}`);
  },

  async fetchOrderById(orderId: string) {
    return this.request(`/orders/${orderId}`);
  },

  async updateOrderStatus(orderId: string, status: string, paymentId?: string) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, paymentId }),
    });
  },
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  createOrder: async (items: OrderItem[], total: number, paymentMethod: string) => {
    set({ loading: true, error: null });
    
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.totalPrice,
        })),
        total,
        currency: 'USD',
        paymentMethod,
        shippingAddress: {
          street: '123 Main St', // Esto debería venir del formulario
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '11001',
          country: 'CO',
        },
      };

      const response = await api.createOrder(orderData);
      
      // Manejar respuesta de Spring Boot
      let responseData;
      if (response.id) {
        // Formato Spring Boot - respuesta directa
        console.log('📦 Using Spring Boot format for create order:', response);
        
        // Transformar la respuesta para que coincida con la interfaz Order
        responseData = {
          orderId: response.id?.toString(),
          id: response.id?.toString(),
          status: response.status?.toLowerCase(),
          total: response.total,
          currency: response.currency,
          paymentMethod: response.paymentMethod,
          createdAt: response.createdAt || new Date().toISOString(),
          updatedAt: response.updatedAt || response.createdAt || new Date().toISOString(),
        };
      } else if (response.success && response.data) {
        // Formato personalizado
        responseData = response.data;
      } else {
        throw new Error(response.message || 'Failed to create order');
      }

      const newOrder: Order = {
        orderId: responseData.orderId,
        id: responseData.id,
        status: responseData.status,
        total: responseData.total,
        currency: responseData.currency || 'USD',
        paymentMethod: responseData.paymentMethod,
        createdAt: responseData.createdAt,
        updatedAt: responseData.updatedAt,
        items,
      };

      set(state => ({
        orders: [newOrder, ...state.orders],
        currentOrder: newOrder,
        loading: false,
      }));

      return newOrder;
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to create order' 
      });
      throw error;
    }
  },

  fetchOrders: async (page = 1, limit = 10, status = 'all') => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.fetchOrders(page, limit, status);
      
      console.log('🔍 fetchOrders response:', response);
      console.log('🔍 response.content:', response.content);
      console.log('🔍 response.success:', response.success);
      
      // Manejar respuesta de Spring Boot
      if (response.content !== undefined) {
        // Formato Spring Boot
        console.log('📦 Using Spring Boot format, orders:', response.content);
        
        // Transformar la respuesta para que coincida con la interfaz Order
        const transformedOrders = (response.content || []).map((order: any) => ({
          orderId: order.id?.toString(), // Convertir a string
          id: order.id?.toString(), // Mantener compatibilidad
          status: order.status?.toLowerCase(), // Convertir a minúsculas
          total: order.total,
          currency: order.currency,
          paymentMethod: order.paymentMethod,
          paymentId: order.paymentId,
          createdAt: order.createdAt || new Date().toISOString(),
          updatedAt: order.updatedAt || order.createdAt || new Date().toISOString(),
          items: order.items?.map((item: any) => ({
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              imageUrls: item.product.imageUrl ? [item.product.imageUrl] : [],
              description: item.product.description || '',
              origin: item.product.origin || '',
              color: item.product.color || '',
              clarity: item.product.clarity || '',
              caratWeight: item.product.caratWeight || 0,
            },
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })) || [],
          shippingAddress: {
            street: order.street,
            city: order.city,
            state: order.state,
            postalCode: order.postalCode,
            country: order.country,
          },
        }));
        
        console.log('🔄 Transformed orders:', transformedOrders);
        set({ 
          orders: transformedOrders,
          loading: false 
        });
      } else if (response.success) {
        // Formato personalizado
        console.log('📦 Using custom format, orders:', response.data.orders);
        set({ 
          orders: response.data.orders,
          loading: false 
        });
      } else {
        console.error('❌ Invalid response format:', response);
        throw new Error(response.message || 'Failed to fetch orders');
      }
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch orders' 
      });
    }
  },

  fetchOrderById: async (orderId: string) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.fetchOrderById(orderId);
      
      // Manejar respuesta de Spring Boot
      let order;
      if (response.id) {
        // Formato Spring Boot - respuesta directa
        console.log('📦 Using Spring Boot format for single order:', response);
        
        // Transformar la respuesta para que coincida con la interfaz Order
        order = {
          orderId: response.id?.toString(),
          id: response.id?.toString(),
          status: response.status?.toLowerCase(),
          total: response.total,
          currency: response.currency,
          paymentMethod: response.paymentMethod,
          paymentId: response.paymentId,
          createdAt: response.createdAt || new Date().toISOString(),
          updatedAt: response.updatedAt || response.createdAt || new Date().toISOString(),
          items: response.items?.map((item: any) => ({
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              imageUrls: item.product.imageUrl ? [item.product.imageUrl] : [],
              description: item.product.description || '',
              origin: item.product.origin || '',
              color: item.product.color || '',
              clarity: item.product.clarity || '',
              caratWeight: item.product.caratWeight || 0,
            },
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })) || [],
          shippingAddress: {
            street: response.street,
            city: response.city,
            state: response.state,
            postalCode: response.postalCode,
            country: response.country,
          },
        };
      } else if (response.success && response.data) {
        // Formato personalizado
        order = response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch order');
      }
      set({ 
        currentOrder: order,
        loading: false 
      });

      return order;
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch order' 
      });
      return null;
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status'], paymentId?: string) => {
    try {
      const response = await api.updateOrderStatus(orderId, status, paymentId);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update order status');
      }

      set(state => ({
        orders: state.orders.map(order => 
          (order.orderId === orderId || order.id === orderId)
            ? { ...order, status, paymentId, updatedAt: new Date().toISOString() }
            : order
        ),
        currentOrder: (state.currentOrder?.orderId === orderId || state.currentOrder?.id === orderId)
          ? { ...state.currentOrder, status, paymentId, updatedAt: new Date().toISOString() }
          : state.currentOrder,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update order status' 
      });
      throw error;
    }
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },

  clearError: () => {
    set({ error: null });
  },
})); 