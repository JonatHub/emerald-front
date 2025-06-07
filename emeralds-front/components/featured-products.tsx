"use client"

import { access } from "fs";
import { useEffect, useState } from "react";

type Producto = {
  id: string;
  emeraldName: string;
};

const FeaturedProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Login para obtener token
    async function fetchTokenAndProducts() {
      try {
        const loginRes = await fetch("http://localhost:8080/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "admin",      // tu username hardcodeado
            password: "admin123",   // tu password hardcodeado
          }),
        });

        if (!loginRes.ok) throw new Error("Login falló");

        const loginData = await loginRes.json();
        const token = loginData.access_token;

        // 2. Llamar productos con token
        const productosRes = await fetch("http://localhost:8080/api/v1/cart?userId=1", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!productosRes.ok) throw new Error("Error al obtener productos");

        const productosData = await productosRes.json();
        setProductos(productosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokenAndProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {productos.map((p) => (
        <div key={p.id} className="border p-4">
          <p>{p.emeraldName}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
