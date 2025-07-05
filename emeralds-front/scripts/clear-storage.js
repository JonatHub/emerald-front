// Script para limpiar localStorage manualmente
// Ejecutar en la consola del navegador

console.log('Limpiando localStorage...');

// Lista de claves que queremos mantener
const keysToKeep = ['auth-storage', 'cart-storage'];

// Obtener todas las claves
const allKeys = Object.keys(localStorage);
console.log('Claves encontradas:', allKeys);

// Contar cuántas claves se van a eliminar
const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key));
console.log('Claves a eliminar:', keysToRemove);

// Eliminar claves no esenciales
keysToRemove.forEach(key => {
  try {
    localStorage.removeItem(key);
    console.log(`✅ Eliminada: ${key}`);
  } catch (error) {
    console.error(`❌ Error eliminando ${key}:`, error);
  }
});

// Verificar el espacio disponible
try {
  const testKey = 'storage-test';
  const testValue = 'x'.repeat(1000);
  localStorage.setItem(testKey, testValue);
  localStorage.removeItem(testKey);
  console.log('✅ Storage funciona correctamente');
} catch (error) {
  console.error('❌ Storage aún tiene problemas:', error);
}

console.log('Limpieza completada'); 