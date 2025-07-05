"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function StorageCleanup() {
  useEffect(() => {
    // Función para limpiar localStorage si está lleno
    const cleanupStorage = () => {
      try {
        // Verificar si hay problemas con el storage
        const testKey = 'storage-test';
        const testValue = 'x'.repeat(1000); // 1KB de datos de prueba
        
        localStorage.setItem(testKey, testValue);
        localStorage.removeItem(testKey);
      } catch (error) {
        console.warn('Storage quota exceeded, cleaning up...');
        
        // Limpiar datos no esenciales
        const keysToKeep = ['auth-storage', 'cart-storage'];
        const allKeys = Object.keys(localStorage);
        
        allKeys.forEach(key => {
          if (!keysToKeep.includes(key)) {
            try {
              localStorage.removeItem(key);
            } catch (e) {
              console.error('Error removing key:', key, e);
            }
          }
        });
        
        toast.info('Se limpió el almacenamiento local para liberar espacio');
      }
    };

    // Ejecutar limpieza al cargar
    cleanupStorage();
  }, []);

  return null; // Este componente no renderiza nada
} 