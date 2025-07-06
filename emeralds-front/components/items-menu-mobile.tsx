import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Menu } from "lucide-react"
import Link from "next/link"

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Menu className="w-6 h-6 cursor-pointer sm:hidden" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="grid gap-4 text-center">
          <nav className="grid gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <Link href="/catalog" className="hover:underline">
              Catálogo de Esmeraldas
            </Link>
            <Link href="/esmeraldas/guia-de-compra" className="hover:underline">
              Guía de Compra
            </Link>
            <Link href="/esmeraldas/certificacion" className="hover:underline">
              Certificación
            </Link>
            <Link href="/nosotros" className="hover:underline">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="hover:underline">
              Contacto
            </Link>
          </nav>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ItemsMenuMobile;