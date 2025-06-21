"use client"

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/app/api/getProductBySlug";
import { ResponseData } from "@/types/response";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.productSlug as string | string[];
  const { result, loading, error }: ResponseData = getProductBySlug(productSlug);

  if (result === null && loading) {
    return <SkeletonProduct />;
  }
  return (
    
    <InfoProduct product={result[0]} />

  );
}
