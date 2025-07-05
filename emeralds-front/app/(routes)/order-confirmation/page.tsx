"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/hooks/use-orders";
import { CheckCircle, Package, Clock, MapPin } from "lucide-react";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getOrder, clearCurrentOrder } = useOrderStore();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      const foundOrder = getOrder(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        clearCurrentOrder();
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [searchParams, getOrder, clearCurrentOrder, router]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Orden Confirmada!
        </h1>
        <p className="text-gray-600">
          Gracias por tu compra. Tu orden ha sido procesada exitosamente.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Detalles de la Orden</h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {order.status === "completed" ? "Completada" : "Procesando"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Información de la Orden</h3>
            <p className="text-sm text-gray-600">ID: {order.id}</p>
            <p className="text-sm text-gray-600">
              Fecha: {new Date(order.createdAt).toLocaleDateString("es-ES")}
            </p>
            {order.paymentId && (
              <p className="text-sm text-gray-600">Payment ID: {order.paymentId}</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Resumen</h3>
            <p className="text-sm text-gray-600">
              Productos: {order.items.length}
            </p>
            <p className="text-lg font-semibold text-green-600">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-900 mb-4">Productos Comprados</h3>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.product.imageUrls[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Cantidad: {item.quantity} | ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Próximos Pasos
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Procesamiento</p>
              <p className="text-sm text-gray-600">
                Tu orden será procesada en las próximas 24 horas.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Envío</p>
              <p className="text-sm text-gray-600">
                Recibirás un email con el número de seguimiento cuando tu pedido sea enviado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  );
} 