"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const features = [
  {
    icon: <Star className="text-emerald-500 w-8 h-8 mb-2" />,
    title: "Calidad Certificada",
    desc: "Todas nuestras esmeraldas cuentan con certificado de autenticidad y origen.",
  },
  {
    icon: <Star className="text-emerald-500 w-8 h-8 mb-2" />,
    title: "Envío Internacional",
    desc: "Llevamos la belleza de Colombia a cualquier parte del mundo.",
  },
  {
    icon: <Star className="text-emerald-500 w-8 h-8 mb-2" />,
    title: "Atención Personalizada",
    desc: "Te asesoramos en cada paso para que elijas la gema perfecta.",
  },
];

const HomeFeatures: React.FC = () => (
  <section className="w-full max-w-5xl px-4 mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">¿Por qué elegirnos?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((f, idx) => (
        <Card key={idx} className="items-center text-center py-8 shadow border-emerald-100">
          <div className="flex flex-col items-center">
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-emerald-700 text-sm">{f.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  </section>
);

export default HomeFeatures; 