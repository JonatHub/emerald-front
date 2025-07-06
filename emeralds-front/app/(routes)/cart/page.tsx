"use client";

import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import PayPalButton from "@/components/paypal-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
    const { items, removeAll, removeItem } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Manejar cantidades por producto
    const [quantities, setQuantities] = useState<{ [id: number]: number }>(
        items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    );

    // Actualizar cantidad
    const handleQuantityChange = (id: number, value: number, stock: number) => {
        if (value < 1) value = 1;
        if (value > stock) value = stock;
        setQuantities((prev) => ({ ...prev, [id]: value }));
    };

    // Calcular el total del carrito considerando cantidades
    const total = items.reduce((acc, item) => acc + item.price * (quantities[item.id] || 1), 0);

    // Crear productos con cantidades para PayPal
    const productsWithQuantities = items.map(item => ({
        ...item,
        quantity: quantities[item.id] || 1,
        totalPrice: item.price * (quantities[item.id] || 1)
    }));

    const handlePaymentSuccess = (details: any) => {
        console.log("Payment completed:", details);
        removeAll();
        setIsCheckingOut(false);
        toast.success("¡Compra completada! Recibirás un email de confirmación.");
        // Redirigir a la página de confirmación con el ID de la orden
        const orderId = details.purchase_units?.[0]?.custom_id;
        if (orderId) {
            router.push(`/order-confirmation?orderId=${orderId}`);
        } else {
            router.push('/orders');
        }
    };

    const handlePaymentError = (error: any) => {
        console.error("Payment error:", error);
        setIsCheckingOut(false);
        toast.error("Error en el proceso de pago. Inténtalo de nuevo.");
    };

    const handlePaymentCancel = () => {
        setIsCheckingOut(false);
        toast.info("Pago cancelado");
    };

    const handleStartCheckout = () => {
        if (items.length === 0) {
            toast.error("El carrito está vacío");
            return;
        }
        setIsCheckingOut(true);
    };

    return (
        <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Carrito de Compras</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 border rounded bg-gray-50">
                            <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
                            <button
                                onClick={() => router.push('/')}
                                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                            >
                                Continuar comprando
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg bg-white shadow-sm">
                                    <div className="flex items-center gap-4 w-full">
                                        <img
                                            src={item.imageUrls[0]}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p className="text-gray-500 text-sm mb-1">{item.description}</p>
                                            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                                <span>Origen: <b>{item.origin}</b></span>
                                                <span>Certificación: <b>{item.certification}</b></span>
                                                <span>Color: <b>{item.color}</b></span>
                                                <span>Claridad: <b>{item.clarity}</b></span>
                                                <span>Peso: <b>{item.caratWeight} ct</b></span>
                                                <span>Dimensiones: <b>{item.lengthMm}mm x {item.widthMm}mm</b></span>
                                                <span>Stock: <b>{item.stockQuantity}</b></span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <label htmlFor={`quantity-${item.id}`} className="text-xs">Cantidad:</label>
                                                <input
                                                    id={`quantity-${item.id}`}
                                                    type="number"
                                                    min={1}
                                                    max={item.stockQuantity}
                                                    value={quantities[item.id] || 1}
                                                    onChange={e =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            parseInt(e.target.value),
                                                            item.stockQuantity
                                                        )
                                                    }
                                                    className="w-16 px-2 py-1 border rounded text-center"
                                                />
                                                <span className="ml-2 text-green-700 font-bold">
                                                    ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
                                    >
                                        Quitar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Summary */}
                <div className="w-full lg:w-80">
                    <div className="bg-gray-100 rounded-lg p-6 shadow-md sticky top-8">
                        <h3 className="text-xl font-semibold mb-4">Resumen de compra</h3>
                        <div className="flex justify-between mb-2">
                            <span>Productos:</span>
                            <span>{items.length}</span>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-xs">
                                    <span>
                                        {item.name} x {quantities[item.id] || 1}
                                    </span>
                                    <span>
                                        ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Total:</span>
                            <span className="font-bold text-green-700">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={removeAll}
                            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Vaciar carrito
                        </button>
                        
                        {!isCheckingOut ? (
                            <button
                                onClick={handleStartCheckout}
                                className="w-full mt-3 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                                disabled={items.length === 0}
                            >
                                Proceder al pago
                            </button>
                        ) : (
                            <div className="mt-4">
                                <PayPalButton
                                    products={productsWithQuantities}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                    onCancel={handlePaymentCancel}
                                />
                                <button
                                    onClick={() => setIsCheckingOut(false)}
                                    className="w-full mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}