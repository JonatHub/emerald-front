"use client"

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/app/api/getProductBySlug";
import { ResponseData } from "@/types/response";
import { ProductType } from "@/types/product";

export default function ProductPage() {
  const params = useParams();
const productSlug = params.productSlug as string | string[];
const { result, loading, error }: ResponseData = getProductBySlug(productSlug);

  console.log("Product params:", result);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Producto X</h1>
      {loading && <p>Cargando producto...</p>}
      {error && <p>Error al cargar el producto.</p>}
      {result && (
        <div>
          {result?.map((result:ProductType) => (
            <div key={result.id}>
              <h2>{result.name}</h2>
              <p>{result.description}</p>
              <p>{result.price}</p>
              <img src={result.imageUrl} alt={result.name} width={150} />
            </div>
          ))}
        </div>
      )}
      {/* Aquí podrías agregar un componente para listar productos por categoría */}
    </main>
  );
}