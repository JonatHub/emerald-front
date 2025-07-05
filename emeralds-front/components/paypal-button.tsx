"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { useOrderStore, OrderItem } from "@/hooks/use-orders";
import { useEffect, useState } from "react";

interface PayPalButtonProps {
  products: ProductType[];
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  products,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { createOrder: createOrderStore, updateOrderStatus } = useOrderStore();
  const [order, setOrder] = useState<any>(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  // Calcular total considerando cantidades
  const total = products.reduce((sum, product) => {
    const quantity = (product as any).quantity || 1;
    return sum + (product.price * quantity);
  }, 0);

  // Crear orden en useEffect para evitar setState durante render
  useEffect(() => {
    if (!isOrderCreated && products.length > 0) {
      try {
        const orderItems: OrderItem[] = products.map(product => ({
          product,
          quantity: (product as any).quantity || 1,
          totalPrice: product.price * ((product as any).quantity || 1),
        }));

        const newOrder = createOrderStore(orderItems, total);
        setOrder(newOrder);
        setIsOrderCreated(true);
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error('Error al crear la orden. Inténtalo de nuevo.');
        onError?.(error);
      }
    }
  }, [products, total, createOrderStore, isOrderCreated, onError]);

  const createPayPalOrder = (data: any, actions: any) => {
    if (!order) {
      throw new Error('Order not created yet');
    }

    // Versión simplificada sin items detallados para evitar problemas de validación
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
          description: `Compra de ${products.length} esmeralda(s) - Alma Esmeralda`,
          custom_id: order.id,
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    if (!order) {
      toast.error("Error: Orden no encontrada");
      return;
    }

    try {
      const details = await actions.order.capture();
      
      // Actualizar el estado de la orden
      try {
        updateOrderStatus(order.id, 'completed', details.id);
      } catch (storageError) {
        console.warn('Error updating order status in storage:', storageError);
      }
      
      toast.success("¡Pago completado exitosamente!");
      onSuccess?.(details);
    } catch (error) {
      try {
        updateOrderStatus(order.id, 'failed');
      } catch (storageError) {
        console.warn('Error updating order status in storage:', storageError);
      }
      toast.error("Error al procesar el pago");
      onError?.(error);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2">Cargando PayPal...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Preparando pago...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalButtons
        createOrder={createPayPalOrder}
        onApprove={onApprove}
        onError={(err: any) => {
          try {
            updateOrderStatus(order.id, 'failed');
          } catch (storageError) {
            console.warn('Error updating order status in storage:', storageError);
          }
          toast.error("Error en el proceso de pago");
          onError?.(err);
        }}
        onCancel={() => {
          try {
            updateOrderStatus(order.id, 'cancelled');
          } catch (storageError) {
            console.warn('Error updating order status in storage:', storageError);
          }
          toast.info("Pago cancelado");
          onCancel?.();
        }}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
      />
    </div>
  );
};

export default PayPalButton; 