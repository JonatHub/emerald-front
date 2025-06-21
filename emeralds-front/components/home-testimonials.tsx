"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María G.",
    text: "La esmeralda que compré superó mis expectativas. El servicio fue excelente y la calidad inigualable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Carlos R.",
    text: "Recibí mi esmeralda en tiempo récord y con toda la documentación. ¡Recomendados!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ana P.",
    text: "Me ayudaron a elegir la piedra perfecta para mi anillo de compromiso. Atención de primera.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const HomeTestimonials: React.FC = () => (
  <section className="w-full max-w-4xl px-4 mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">Testimonios</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => (
        <Card key={idx} className="shadow border-emerald-100">
          <CardContent className="flex flex-col items-center py-6">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-emerald-200 object-cover" />
            <p className="text-emerald-800 italic mb-2">“{t.text}”</p>
            <span className="font-semibold text-emerald-900">{t.name}</span>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default HomeTestimonials; 