import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import PayPalProvider from "@/components/paypal-provider";
import StorageCleanup from "@/components/storage-cleanup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alma Esmeralda - Esmeraldas Colombianas",
  description: "Descubre la belleza y el valor de las esmeraldas auténticas de Colombia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <PayPalProvider>
          <StorageCleanup />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </PayPalProvider>
      </body>
    </html>
  );
}
