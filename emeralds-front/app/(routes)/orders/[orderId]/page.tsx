"use client";
import { useParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/hooks/use-orders";
import OrderStatusBadge from "@/components/order-status-badge";
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  DollarSign, 
  Hash, 
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw
} from "lucide-react";
import { useEffect } from "react";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentOrder, loading, error, fetchOrderById, clearError } = useOrderStore();
  const orderId = params.orderId as string;

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar la orden</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => fetchOrderById(orderId)}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Reintentar
            </button>
            <button
              onClick={() => clearError()}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Limpiar Error
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando orden...</p>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orden no encontrada</h1>
          <p className="text-gray-600 mb-6">
            La orden que buscas no existe o ha sido eliminada.
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Volver a Mis Pedidos
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getOrderStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'completed':
        return 4;
      case 'failed':
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  const steps = [
    { name: "Orden Creada", icon: Package },
    { name: "Pago Procesado", icon: DollarSign },
    { name: "En Preparación", icon: Clock },
    { name: "Completada", icon: CheckCircle }
  ];

  const currentStep = getOrderStep(currentOrder.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Mis Pedidos
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Orden #{(currentOrder.orderId || currentOrder.id || '').slice(-8)}
            </h1>
            <p className="text-gray-600">
              Creada el {formatDate(currentOrder.createdAt)}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <OrderStatusBadge status={currentOrder.status} size="lg" />
            <button
              onClick={() => fetchOrderById(orderId)}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Order Progress */}
      <div className="bg-white rounded-lg shadow border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Estado del Pedido</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep - 1;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-600 text-white' 
                      : isCurrent 
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <p className={`text-sm mt-2 text-center ${
                    isCompleted ? 'text-green-600 font-medium' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-green-600 transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Information */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de la Orden</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">ID de Orden</p>
                <p className="font-mono text-gray-900">{currentOrder.orderId || currentOrder.id}</p>
              </div>
            </div>
            
            {currentOrder.paymentId && (
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="font-mono text-gray-900">{currentOrder.paymentId}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Fecha de Creación</p>
                <p className="text-gray-900">{formatDate(currentOrder.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Última Actualización</p>
                <p className="text-gray-900">{formatDate(currentOrder.updatedAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Método de Pago</p>
                <p className="text-gray-900 capitalize">{currentOrder.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen de la Compra</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Productos</span>
              <span className="font-semibold">{currentOrder.items.length}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${currentOrder.total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Envío</span>
              <span className="font-semibold">Gratis</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ${currentOrder.total.toFixed(2)} {currentOrder.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white rounded-lg shadow border p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Productos</h2>
        
        <div className="space-y-4">
          {currentOrder.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={item.product.imageUrls[0]}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded border"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span>Origen: <b>{item.product.origin}</b></span>
                  <span>Color: <b>{item.product.color}</b></span>
                  <span>Claridad: <b>{item.product.clarity}</b></span>
                  <span>Peso: <b>{item.product.caratWeight} ct</b></span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                <p className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      {currentOrder.status === 'completed' && currentOrder.shippingAddress && (
        <div className="bg-white rounded-lg shadow border p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Información de Envío
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Dirección de Envío</p>
                <p className="text-gray-600">
                  {currentOrder.shippingAddress.street}<br />
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}<br />
                  {currentOrder.shippingAddress.postalCode}, {currentOrder.shippingAddress.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Estado de Envío</p>
                <p className="text-gray-600">
                  Tu pedido será procesado en las próximas 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details */}
      {currentOrder.paymentDetails && (
        <div className="bg-white rounded-lg shadow border p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Detalles del Pago
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-gray-900">{currentOrder.paymentDetails.transactionId}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Estado del Pago</p>
                <p className="text-gray-900 capitalize">{currentOrder.paymentDetails.paymentStatus}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Fecha del Pago</p>
                <p className="text-gray-900">{formatDate(currentOrder.paymentDetails.paymentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Método de Pago</p>
                <p className="text-gray-900 capitalize">{currentOrder.paymentDetails.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 