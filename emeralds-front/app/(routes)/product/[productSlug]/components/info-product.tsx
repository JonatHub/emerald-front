import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import { useCart } from "../../../../../hooks/use-cart";
import { useWishlist } from "../../../../../hooks/wishlist"; // Asegúrate de tener este hook
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

const infoProduct = (props: InfoProductProps) => {
  const { addItem } = useCart();
  const { addItem: addWishlistItem } = useWishlist(); // Usar el hook de wishlist
  const { product } = props;
  const [current, setCurrent] = useState(0);

  // Carousel navigation handlers
  const prevImage = () => setCurrent((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
  const nextImage = () => setCurrent((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl shadow-xl">
      {/* Carousel de imágenes */}
      <div className="flex flex-col items-center md:w-1/2">
        <div className="relative w-full flex justify-center mb-4">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-emerald-100 rounded-full p-2 shadow transition z-10"
            aria-label="Anterior"
            style={{ display: product.imageUrls.length > 1 ? "block" : "none" }}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={product.imageUrls[current]}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-xl border-4 border-emerald-200 shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-emerald-100 rounded-full p-2 shadow transition z-10"
            aria-label="Siguiente"
            style={{ display: product.imageUrls.length > 1 ? "block" : "none" }}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Miniaturas */}
        {product.imageUrls.length > 1 && (
          <div className="flex gap-2 flex-wrap justify-center mt-2">
            {product.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${product.name} ${idx + 1}`}
                className={`w-16 h-16 object-cover rounded border transition cursor-pointer ${
                  idx === current
                    ? "border-emerald-500 ring-2 ring-emerald-300"
                    : "border-emerald-100 opacity-70"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h1 className="text-3xl font-bold text-emerald-900">{product.name}</h1>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 rounded-full">
                {product.origin}
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full border border-emerald-300">
                {product.certification}
              </span>
            </div>
          </div>
          <p className="mb-4 text-gray-700 text-base">{product.description}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
            <div>
              <span className="font-semibold text-emerald-800">Peso (Quilates):</span>
              <span className="ml-2">{product.caratWeight} ct</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-800">Color:</span>
              <span className="ml-2">{product.color}</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-800">Claridad:</span>
              <span className="ml-2">{product.clarity}</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-800">Stock:</span>
              <span className="ml-2">{product.stockQuantity}</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-800">Dimensiones:</span>
              <span className="ml-2">{product.lengthMm}mm x {product.widthMm}mm</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-800">Precio:</span>
              <span className="ml-2 text-lg font-bold text-emerald-700">${product.price}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition"
            onClick={() => addItem(product)}
          >
            Comprar ahora
          </button>
          <button
            className="flex items-center gap-2 px-5 py-3 border border-emerald-400 text-emerald-700 rounded-lg hover:bg-emerald-50 transition"
            onClick={() => addWishlistItem(product)}
            aria-label="Agregar a favoritos"
          >
            <Heart width={24} strokeWidth={1.5} className="transition" />
            <span className="hidden sm:inline">Agregar a favoritos</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-6 text-xs text-gray-500">
          <span>Creado: {new Date(product.createdAt).toLocaleDateString()}</span>
          <span>Actualizado: {new Date(product.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default infoProduct;