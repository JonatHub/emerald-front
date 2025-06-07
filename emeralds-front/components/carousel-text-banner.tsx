"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export const dataCarrouselTextBanner = [
  { id: 1, text: "Descubre la magia de las esmeraldas auténticas", src:"https://cdn0.matrimonio.com.co/article-vendor-o/4087/original/1280/jpg/maria-alejandra-riano-02_10_114087_v1.jpeg", link: "/a"},
  { id: 2, text: "Calidad y transparencia en cada gema",src:"https://cdn0.matrimonio.com.co/article-vendor-o/4087/original/1280/jpg/maria-alejandra-riano-02_10_114087_v1.jpeg", link: "/a"},
  { id: 3, text: "Tu guía para elegir la esmeralda perfecta",src:"https://cdn0.matrimonio.com.co/article-vendor-o/4087/original/1280/jpg/maria-alejandra-riano-02_10_114087_v1.jpeg", link: "/a" },
  { id: 4, text: "Compra con confianza y garantía de autenticidad",src:"https://cdn0.matrimonio.com.co/article-vendor-o/4087/original/1280/jpg/maria-alejandra-riano-02_10_114087_v1.jpeg", link: "/a" }
]

const CarouselTextBanner = () => {
  const router = useRouter()
  return (
    <div className="bg-gray-200">
      <Carousel className="w-full max-w-4xl mx-auto"
       plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      >
        <CarouselContent>
          {dataCarrouselTextBanner.map(({id, text, src, link}) => (
            <CarouselItem key={id}>
              <div className="p-1">
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <span className="text-4xl font-semibold">{text}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
    </div>
  )
}

export default CarouselTextBanner;