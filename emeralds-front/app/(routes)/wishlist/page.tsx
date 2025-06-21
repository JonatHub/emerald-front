"use client";

import { useWishlist } from "@/hooks/wishlist"; // Debes crear este hook similar a useCart
import { ProductType } from "@/types/product"; // Si necesitas el tipo

export default function Page() {
    const { items, removeItem } = useWishlist();

    return (
        <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Loved Products</h1>
            <div className="flex flex-col gap-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border rounded bg-gray-50">
                        <p className="text-gray-500 text-lg">No tienes productos en tu lista de favoritos.</p>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <li key={item.id} className="flex flex-col items-center border rounded-lg bg-white shadow-sm p-4">
                                <img
                                    src={item.imageUrls[0]}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded mb-2"
                                />
                                <h2 className="text-lg font-semibold text-center">{item.name}</h2>
                                <p className="text-gray-500 text-sm text-center mb-2">{item.description}</p>
                                <span className="font-bold text-green-700 mb-2">${item.price.toFixed(2)}</span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
                                >
                                    Quitar de favoritos
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}