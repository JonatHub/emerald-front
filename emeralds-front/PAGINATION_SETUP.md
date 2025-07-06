# 📄 Configuración de Paginación - Alma Esmeralda

## 🎯 **Paginación Spring Boot Compatible**

### **Características Implementadas**

✅ **Página inicial en 0** (compatible con Spring Boot)  
✅ **10 elementos por página** (configurable)  
✅ **Navegación entre páginas** con botones anterior/siguiente  
✅ **Números de página clickeables**  
✅ **Información de elementos mostrados**  
✅ **Estados de carga** durante la navegación  

## 🔧 **Configuración Técnica**

### **Frontend (Next.js)**

#### **Hook useOrders**
```typescript
// hooks/use-orders.ts
async fetchOrders(page = 0, limit = 10, status = 'all') {
  return this.request(`${config.api.endpoints.orders}?page=${page}&size=${limit}&status=${status}`);
}
```

#### **Store State**
```typescript
interface OrderStore {
  // ... otros campos
  currentPage: number;    // Página actual (empieza en 0)
  totalPages: number;     // Total de páginas
  totalElements: number;  // Total de elementos
  pageSize: number;       // Elementos por página
}
```

#### **Componente de Paginación**
```typescript
// components/orders-pagination.tsx
<OrdersPagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalElements={totalElements}
  size={pageSize}
  onPageChange={handlePageChange}
  loading={loading}
/>
```

### **Backend (Spring Boot)**

#### **Endpoint**
```bash
GET /api/v1/orders?page=0&size=10&status=all
```

#### **Respuesta Esperada**
```json
{
  "content": [...],           // Array de órdenes
  "pageable": {
    "pageNumber": 0,          // Página actual
    "pageSize": 10,           // Elementos por página
    "offset": 0
  },
  "totalPages": 5,            // Total de páginas
  "totalElements": 50,        // Total de elementos
  "numberOfElements": 10,     // Elementos en esta página
  "first": true,              // ¿Es la primera página?
  "last": false               // ¿Es la última página?
}
```

## 🎨 **UI/UX de Paginación**

### **Información Mostrada**
- **"Mostrando 1 a 10 de 50 órdenes"** - Información contextual
- **Botones Anterior/Siguiente** - Navegación principal
- **Números de página** - Navegación directa
- **Estados deshabilitados** - Cuando no hay más páginas

### **Comportamiento Inteligente**
- **Páginas mostradas**: Primera, última, y 3 alrededor de la actual
- **Elipsis (...)**: Para páginas no mostradas
- **Scroll automático**: Al cambiar de página
- **Estados de carga**: Durante la navegación

### **Ejemplo Visual**
```
[Anterior] [1] [2] [3] [4] [5] [6] ... [10] [Siguiente]
Mostrando 1 a 10 de 50 órdenes
```

## 🚀 **Uso**

### **Navegación Básica**
1. **Cargar primera página**: `fetchOrders(0)`
2. **Siguiente página**: `fetchOrders(1)`
3. **Página específica**: `fetchOrders(5)`

### **Filtros con Paginación**
```typescript
// Página 2 con filtro de estado
fetchOrders(2, 10, 'completed');

// Página 0 con 20 elementos
fetchOrders(0, 20, 'all');
```

### **Manejo de Estados**
```typescript
const { 
  orders, 
  currentPage, 
  totalPages, 
  totalElements, 
  pageSize,
  loading 
} = useOrderStore();

// Verificar si hay más páginas
const hasNextPage = currentPage < totalPages - 1;
const hasPrevPage = currentPage > 0;
```

## 🔍 **Debugging**

### **Verificar Paginación**
```javascript
// En la consola del navegador
console.log('Pagination Info:', {
  currentPage: window.__ZUSTAND_STORE__.getState().currentPage,
  totalPages: window.__ZUSTAND_STORE__.getState().totalPages,
  totalElements: window.__ZUSTAND_STORE__.getState().totalElements,
  pageSize: window.__ZUSTAND_STORE__.getState().pageSize
});
```

### **Test con cURL**
```bash
# Primera página
curl -X GET "http://localhost:8080/api/v1/orders?page=0&size=10" \
  -H "Authorization: Bearer {token}"

# Segunda página
curl -X GET "http://localhost:8080/api/v1/orders?page=1&size=10" \
  -H "Authorization: Bearer {token}"
```

## ⚙️ **Configuración Avanzada**

### **Cambiar Elementos por Página**
```typescript
// En hooks/use-orders.ts
const DEFAULT_PAGE_SIZE = 20; // Cambiar de 10 a 20

async fetchOrders(page = 0, limit = DEFAULT_PAGE_SIZE, status = 'all') {
  return this.request(`${config.api.endpoints.orders}?page=${page}&size=${limit}&status=${status}`);
}
```

### **Paginación Personalizada**
```typescript
// Componente personalizado
<OrdersPagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalElements={totalElements}
  size={pageSize}
  onPageChange={handlePageChange}
  loading={loading}
  showInfo={true}        // Mostrar/ocultar info
  showNumbers={true}     // Mostrar/ocultar números
  maxVisiblePages={5}    // Máximo páginas visibles
/>
```

## 🐛 **Solución de Problemas**

### **Problema: No se muestran más páginas**
1. Verificar que `totalPages > 1`
2. Confirmar que `totalElements > pageSize`
3. Revisar la respuesta del backend

### **Problema: Página incorrecta**
1. Verificar que `currentPage` empiece en 0
2. Confirmar que `page` se pase correctamente al backend
3. Revisar logs de la consola

### **Problema: Elementos duplicados**
1. Verificar que el store se actualice correctamente
2. Confirmar que no haya múltiples llamadas a `fetchOrders`
3. Revisar el manejo de estado en el componente

## 📈 **Mejoras Futuras**

### **Funcionalidades Planificadas**
- [ ] **Paginación infinita** con scroll
- [ ] **Selector de elementos por página** (10, 20, 50)
- [ ] **Búsqueda con paginación** preservada
- [ ] **URL con parámetros** de paginación
- [ ] **Cache de páginas** visitadas

### **Optimizaciones**
- [ ] **Preload** de páginas adyacentes
- [ ] **Virtualización** para listas grandes
- [ ] **Debounce** en cambios de página
- [ ] **Persistencia** de página actual

## 🎯 **Resultado Final**

Con esta implementación:

✅ **Paginación compatible** con Spring Boot  
✅ **UI intuitiva** y responsive  
✅ **Navegación fluida** entre páginas  
✅ **Información clara** de elementos mostrados  
✅ **Estados de carga** manejados correctamente  
✅ **Filtros integrados** con paginación  