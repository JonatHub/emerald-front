"use client"

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/app/api/getProductBySlug";
import { ResponseData } from "@/types/response";
import { ProductType } from "@/types/product";
import SkeletonProduct from "./components/skeleton-product";
import { Car } from "lucide-react";
import CarouselProduct from "./components/carousel-product";

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.productSlug as string | string[];
  const { result, loading, error }: ResponseData = getProductBySlug(productSlug);

  if (result === null && loading) {
    return <SkeletonProduct />;
  }
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <CarouselProduct
          id={result[0].id}
          name={result[0].name}
          description={result[0].description}
          price={result[0].price}
          caratWeight={result[0].caratWeight}
          origin={result[0].origin}
          certification={result[0].certification}
          clarity={result[0].clarity}
          color={result[0].color}
          imageUrls={result[0].imageUrls}
          stockQuantity={result[0].stockQuantity}
          lengthMm={result[0].lengthMm}
          widthMm={result[0].widthMm}
          createdAt={result[0].createdAt}
          updatedAt={result[0].updatedAt}
        />
      </div>

      <div className="sm:px-12">
        <p>Info del producto</p>
      </div>
    </div >
  );
}
