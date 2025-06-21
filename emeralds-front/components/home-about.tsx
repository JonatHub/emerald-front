"use client";
import React from "react";

const HomeAbout: React.FC = () => (
  <section className="w-full max-w-4xl px-4 mb-16 flex flex-col md:flex-row items-center gap-8">
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
      alt="Sobre nosotros"
      className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover"
    />
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
      <p className="text-lg text-emerald-800 mb-2">
        Somos una empresa familiar con más de 30 años de experiencia en el mundo de las esmeraldas. Nuestro compromiso es ofrecer solo gemas auténticas, con transparencia y pasión por la excelencia.
      </p>
      <p className="text-emerald-700">
        Trabajamos directamente con mineros y artesanos colombianos, garantizando calidad y responsabilidad social en cada pieza.
      </p>
    </div>
  </section>
);

export default HomeAbout; 