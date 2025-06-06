"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Catálogo de Esmeraldas",
    href: "/esmeraldas/catalogo",
    description:
      "Explora nuestra colección de esmeraldas colombianas, con variedad de cortes, tamaños y calidades.",
  },
  {
    title: "Guía de Compra",
    href: "/esmeraldas/guia-de-compra",
    description:
      "Aprende cómo elegir una esmeralda auténtica y qué factores influyen en su valor.",
  },
  {
    title: "Esmeraldas Personalizadas",
    href: "/esmeraldas/personalizadas",
    description:
      "Solicita una esmeralda hecha a medida para anillos, collares u otras joyas exclusivas.",
  },
  {
    title: "Certificación y Autenticidad",
    href: "/esmeraldas/certificacion",
    description:
      "Conoce los certificados que acompañan nuestras esmeraldas y garantiza su origen y calidad.",
  },
  {
    title: "Sobre Nosotros",
    href: "/nosotros",
    description:
      "Descubre quiénes somos, nuestra historia y nuestro compromiso con la calidad y la transparencia.",
  },
  {
    title: "Contacto",
    href: "/contacto",
    description:
      "¿Tienes preguntas o necesitas asesoría? Contáctanos y te ayudaremos en lo que necesites.",
  },
];


export const MenuList = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {/* Inicio */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Esmeraldas Colombia
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Venta de esmeraldas colombianas auténticas con garantía y envío internacional.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/nosotros" title="Quiénes Somos">
                Conoce nuestra historia, tradición y compromiso con la calidad.
              </ListItem>
              <ListItem href="/contacto" title="Contáctanos">
                Escríbenos si necesitas asesoría o deseas una esmeralda personalizada.
              </ListItem>
              <ListItem href="/testimonios" title="Testimonios">
                Opiniones reales de nuestros clientes satisfechos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Catálogo */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catálogo</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Certificación */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Autenticidad</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/esmeraldas/certificacion">
                    <div className="font-medium">Certificación</div>
                    <div className="text-muted-foreground">
                      Información sobre nuestros certificados de autenticidad.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/esmeraldas/garantia">
                    <div className="font-medium">Garantía</div>
                    <div className="text-muted-foreground">
                      Te garantizamos calidad y respaldo en cada compra.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Guía */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Guía</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/esmeraldas/guia-de-compra">
                    <div className="font-medium">Cómo elegir</div>
                    <div className="text-muted-foreground">
                      Consejos para escoger la esmeralda ideal según tu necesidad.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/blog">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Artículos sobre tendencias, tips y cultura esmeraldera.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};


function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default MenuList;