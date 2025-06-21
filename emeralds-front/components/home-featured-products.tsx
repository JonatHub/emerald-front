"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const featuredProducts = [
  {
    id: 1,
    name: "Esmeralda Trapiche",
    price: 12000,
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Una de las esmeraldas más raras y bellas del mundo.",
  },
  {
    id: 2,
    name: "Esmeralda Clásica",
    price: 800,
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description: "Color verde intenso y pureza excepcional.",
  },
  {
    id: 3,
    name: "Esmeralda Ovalada",
    price: 9900,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Elegancia y sofisticación en cada detalle.",
  },
];

const HomeFeaturedProducts: React.FC = () => (
  <section className="w-full max-w-5xl px-4 mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredProducts.map((emerald) => (
        <Card key={emerald.id} className="shadow-lg border-emerald-100 hover:shadow-emerald-200 transition">
          <img src={emerald.imageUrl} alt={emerald.name} className="w-full h-48 object-cover rounded-t-xl" />
          <CardContent className="pt-4 pb-2">
            <h3 className="text-xl font-semibold mb-1">{emerald.name}</h3>
            <p className="text-emerald-700 text-sm mb-2">{emerald.description}</p>
            <p className="text-emerald-900 font-bold text-lg">${emerald.price.toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default HomeFeaturedProducts; 