"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const bannerPhrases = [
  "Descubre la magia de las esmeraldas auténticas",
  "Calidad y transparencia en cada gema",
  "Tu guía para elegir la esmeralda perfecta",
  "Compra con confianza y garantía de autenticidad",
];

const HomeBanner: React.FC = () => (
  <section className="w-full bg-emerald-100 py-6 mb-12">
    <Carousel
      className="w-full max-w-2xl mx-auto"
      plugins={[Autoplay({ delay: 3500 })]}
    >
      <CarouselContent>
        {bannerPhrases.map((text, idx) => (
          <CarouselItem key={idx}>
            <div className="flex justify-center items-center h-16">
              <span className="text-2xl md:text-3xl font-semibold text-emerald-800">{text}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </section>
);

export default HomeBanner; 