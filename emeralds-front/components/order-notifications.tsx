"use client";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/hooks/use-orders";
import { toast } from "sonner";
import { Package, CheckCircle, XCircle } from "lucide-react";

export default function OrderNotifications() {
  const { orders } = useOrderStore();
  const [lastOrderCount, setLastOrderCount] = useState(orders.length);

  useEffect(() => {
    // Detectar nuevas órdenes
    if (orders.length > lastOrderCount) {
      const newOrders = orders.slice(lastOrderCount);
      
      newOrders.forEach(order => {
        if (order.status === 'completed') {
          toast.success(
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">¡Pago completado!</p>
                <p className="text-sm">Orden #{order.id.slice(-8)} procesada exitosamente</p>
              </div>
            </div>,
            {
              duration: 5000,
            }
          );
        } else if (order.status === 'failed') {
          toast.error(
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium">Error en el pago</p>
                <p className="text-sm">Orden #{order.id.slice(-8)} falló</p>
              </div>
            </div>,
            {
              duration: 5000,
            }
          );
        } else if (order.status === 'pending') {
          toast.info(
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Nueva orden creada</p>
                <p className="text-sm">Orden #{order.id.slice(-8)} pendiente de pago</p>
              </div>
            </div>,
            {
              duration: 3000,
            }
          );
        }
      });
    }
    
    setLastOrderCount(orders.length);
  }, [orders, lastOrderCount]);

  return null; // Este componente no renderiza nada visualmente
} 