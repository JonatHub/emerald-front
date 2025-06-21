"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const emeraldSlides = [
  {
    id: 1,
    title: "Esmeraldas Colombianas",
    description: "La gema más codiciada del mundo, directamente de las minas de Colombia.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Belleza Natural",
    description: "Cada esmeralda es única, con un brillo y color incomparables.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Selección Exclusiva",
    description: "Solo las mejores piedras, seleccionadas por expertos para ti.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
];

const HomeHero: React.FC = () => (
  <>
    <section className="w-full max-w-3xl px-4 py-12 text-center">
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Alma Esmeralda</h1>
      <p className="text-lg md:text-xl mb-8 text-emerald-700 font-medium">
        Descubre la belleza y el valor de las esmeraldas auténticas. Selección exclusiva, calidad garantizada.
      </p>
      <a
        href="#coleccion"
        className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition"
      >
        Ver colección
      </a>
    </section>
    <section className="w-full max-w-2xl mb-12">
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 4000 })]}
      >
        <CarouselContent>
          {emeraldSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-2xl shadow-xl object-cover w-full h-64 mb-4 border-4 border-emerald-100"
                />
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-emerald-700 text-base md:text-lg">{slide.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  </>
);

export default HomeHero; 