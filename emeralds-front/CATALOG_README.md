# 📋 Página de Catálogo - Alma Esmeralda

## 🎯 Descripción

La página de catálogo (`/catalog`) es una interfaz completa para explorar y filtrar la colección de esmeraldas colombianas. Permite a los usuarios buscar, filtrar por precio, ordenar y navegar por los productos de manera eficiente.

## ✨ Características

### 🔍 Filtros Avanzados
- **Búsqueda por texto**: Busca en nombre, descripción y origen
- **Filtro por precio**: Rango mínimo y máximo en USD
- **Ordenamiento**: Por nombre, precio o peso (ascendente/descendente)

### 📱 Diseño Responsivo
- Grid adaptativo: 1 columna en móvil, 2 en tablet, 3 en desktop, 4 en pantallas grandes
- Navegación optimizada para dispositivos móviles
- Componentes reutilizables y modulares

### ⚡ Rendimiento
- Paginación del lado del cliente (12 productos por página)
- Carga lazy de imágenes con fallback
- Estados de carga y error manejados

## 🏗️ Arquitectura

### Componentes Principales

#### `CatalogPage` (`app/(routes)/catalog/page.tsx`)
- Página principal del catálogo
- Maneja el estado global de filtros y paginación
- Coordina la comunicación entre componentes

#### `CatalogFilters` (`components/catalog-filters.tsx`)
- Panel de filtros reutilizable
- Búsqueda, filtros de precio y ordenamiento
- Contador de resultados

#### `ProductCard` (`components/product-card.tsx`)
- Tarjeta individual de producto
- Muestra imagen, información y acciones
- Formateo de precios en USD

#### `Pagination` (`components/pagination.tsx`)
- Navegación entre páginas
- Botones anterior/siguiente
- Números de página clickeables

### Hooks Personalizados

#### `useProducts` (`hooks/use-products.ts`)
- Maneja la obtención de productos del API
- Estados de carga y error
- Configuración centralizada

### Configuración

#### `config` (`lib/config.ts`)
- Variables de entorno del API
- URLs y endpoints centralizados
- Configuración de PayPal

## 🔌 Integración con Backend

### Endpoint Utilizado
```
GET http://localhost:8080/api/v1/emeralds
```

### Respuesta Esperada
```json
[
  {
    "id": 1,
    "name": "Esmeralda Muzo Premium",
    "description": "Hermosa esmeralda colombiana de la mina de Muzo",
    "price": 15000.00,
    "caratWeight": 2.5,
    "origin": "Muzo, Colombia",
    "certification": "GIA-123456",
    "clarity": "VS",
    "color": "Verde Intenso",
    "imageUrls": ["https://example.com/image1.jpg"],
    "stockQuantity": 1,
    "lengthMm": 8.50,
    "widthMm": 6.20,
    "createdAt": "2025-06-26T23:22:32.909517",
    "updatedAt": "2025-06-26T23:22:32.909517"
  }
]
```

## 🎨 UI/UX

### Diseño Visual
- **Colores**: Verde esmeralda como color principal
- **Tipografía**: Jerarquía clara con títulos y descripciones
- **Espaciado**: Consistente con el sistema de diseño

### Interacciones
- **Hover effects**: Escalado suave en imágenes y sombras en tarjetas
- **Transiciones**: Animaciones fluidas de 200ms
- **Feedback visual**: Estados activos en botones y filtros

### Accesibilidad
- **Labels**: Todos los inputs tienen labels asociados
- **Contraste**: Cumple con estándares WCAG
- **Navegación**: Compatible con teclado

## 🚀 Uso

### Navegación
1. Accede a `/catalog` desde el menú principal
2. Usa los filtros para refinar la búsqueda
3. Navega entre páginas con la paginación
4. Haz clic en "Ver Detalles" para ver un producto específico

### Filtros
- **Búsqueda**: Escribe en el campo de búsqueda para filtrar por texto
- **Precio**: Establece rangos mínimo y máximo
- **Ordenamiento**: Selecciona el criterio y dirección de ordenamiento

## 🔧 Configuración

### Variables de Entorno
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Personalización
- **Productos por página**: Modifica `ITEMS_PER_PAGE` en `CatalogPage`
- **Estilos**: Personaliza las clases de Tailwind CSS
- **Filtros**: Agrega nuevos filtros en `CatalogFilters`

## 🐛 Solución de Problemas

### Error de Carga
- Verifica que el backend esté ejecutándose en `http://localhost:8080`
- Revisa la consola del navegador para errores de red
- Confirma que el endpoint `/api/v1/emeralds` esté disponible

### Imágenes No Cargadas
- Las imágenes tienen fallback a `/placeholder-emerald.jpg`
- Verifica que las URLs de las imágenes sean válidas
- Revisa la configuración de CORS en el backend

### Filtros No Funcionan
- Confirma que los productos tengan los campos esperados
- Verifica la lógica de filtrado en `CatalogPage`
- Revisa la consola para errores de JavaScript

## 📈 Mejoras Futuras

### Funcionalidades Planificadas
- [ ] Filtros por claridad, color y origen
- [ ] Vista de lista/grid toggle
- [ ] Comparación de productos
- [ ] Wishlist integrado
- [ ] Filtros guardados en URL

### Optimizaciones
- [ ] Virtualización para listas grandes
- [ ] Cache de productos
- [ ] Lazy loading de imágenes
- [ ] Service Worker para offline

## 🤝 Contribución

Para contribuir al catálogo:

1. Sigue las convenciones de código existentes
2. Mantén la modularidad de componentes
3. Agrega tests para nuevas funcionalidades
4. Documenta cambios en este README
5. Verifica la responsividad en diferentes dispositivos 