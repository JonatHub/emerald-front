import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types/product";
import { toast } from "sonner";


interface CartStore {

    items: ProductType[];
    addItem: (data: ProductType) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
}

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: ProductType) => {
                const existingItem = get().items.find(item => item.id === data.id);
                if (existingItem) {
                    toast.error("El producto ya está en el carrito");
                    return;
                }
                set(state => ({
                    items: [...state.items, data]
                }));
                toast.success("Producto añadido al carrito");
            },
            removeItem: (id: number) => {
                set(state => ({
                    items: state.items.filter(item => item.id !== id)
                }));
                toast.success("Producto eliminado del carrito");
            },
            removeAll: () => {
                set({ items: [] });
                toast.success("Carrito vaciado");
            }
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);