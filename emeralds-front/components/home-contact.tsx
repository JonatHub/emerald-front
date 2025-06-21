"use client";
import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const HomeContact: React.FC = () => (
  <section className="w-full max-w-3xl px-4 mb-20 text-center">
    <h2 className="text-3xl font-bold mb-4">¿Tienes preguntas?</h2>
    <p className="text-lg text-emerald-800 mb-6">Contáctanos y recibe asesoría personalizada para encontrar la esmeralda perfecta.</p>
    <div className="flex flex-col md:flex-row justify-center gap-6 mb-4">
      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold shadow hover:bg-emerald-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 2.017 0 3.905-.606 5.477-1.646l3.273.873a.75.75 0 00.927-.927l-.873-3.273A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z" />
        </svg>
        WhatsApp
      </a>
      <a href="mailto:contacto@almaesmeralda.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-100 text-emerald-900 rounded-full font-semibold shadow hover:bg-emerald-200 transition">
        <Mail className="w-6 h-6" />
        Email
      </a>
    </div>
    <div className="flex justify-center gap-4">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-emerald-500">
        <Instagram size={28} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-emerald-500">
        <Facebook size={28} />
      </a>
    </div>
  </section>
);

export default HomeContact; 