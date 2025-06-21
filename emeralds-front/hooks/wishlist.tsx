import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

type WishlistStore = {
  items: ProductType[];
  addItem: (product: ProductType) => void;
  removeItem: (id: number) => void;
};

export const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (get().items.find((item) => item.id === product.id)) {
          toast.error("El producto ya está en favoritos");
          return;
        }
        set((state) => ({ items: [...state.items, product] }));
        toast.success("Producto añadido a favoritos");
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);