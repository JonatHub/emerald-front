import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-sm">
        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
            <li><Link href="/esmeraldas/catalogo" className="hover:underline">Catálogo</Link></li>
            <li><Link href="/esmeraldas/guia-de-compra" className="hover:underline">Guía de Compra</Link></li>
            <li><Link href="/nosotros" className="hover:underline">Sobre Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <p>WhatsApp: +57 300 123 4567</p>
          <p>Email: contacto@almaesmeralda.com</p>
          <p>Ubicación: Bogotá, Colombia</p>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-emerald-400"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-emerald-400"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:contacto@almaesmeralda.com"
              aria-label="Correo"
              className="hover:text-emerald-400"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="text-center text-xs text-gray-400 mt-8 px-4">
        <p>© {new Date().getFullYear()} AlmaEsmeralda.</p>
        <p>Diseñado con amor y esmeraldas.</p>
      </div>
    </footer>
  )
}

export default Footer
