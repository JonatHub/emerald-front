# 🚀 Configuración del Backend Spring Boot para Alma Esmeralda

## 📋 **Endpoints Requeridos para Spring Boot**

### **1. Crear Orden**
```bash
POST /api/v1/orders
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {user_token}
```

**Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "unitPrice": 1500.00,
      "totalPrice": 3000.00
    }
  ],
  "total": 3000.00,
  "currency": "USD",
  "paymentMethod": "paypal",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "postalCode": "11001",
    "country": "CO"
  }
}
```

**Respuesta Esperada (Spring Boot):**
```json
{
  "id": "ord_1234567890abcdef",
  "status": "pending",
  "total": 3000.00,
  "currency": "USD",
  "paymentMethod": "paypal",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Esmeralda Colombiana Premium",
      "quantity": 2,
      "unitPrice": 1500.00,
      "totalPrice": 3000.00
    }
  ]
}
```

### **2. Obtener Órdenes del Usuario (Paginado)**
```bash
GET /api/v1/orders?page=0&size=10&status=all
```

**Nota**: La paginación en Spring Boot empieza en `page=0`, no en `page=1`. El parámetro `size` controla cuántos elementos por página.

**Headers:**
```
Authorization: Bearer {user_token}
```

**Respuesta Esperada (Spring Boot Page):**
```json
{
  "content": [
    {
      "id": "ord_1234567890abcdef",
      "status": "completed",
      "total": 3000.00,
      "currency": "USD",
      "paymentMethod": "paypal",
      "paymentId": "PAY-1234567890",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:05:00Z",
      "items": [
        {
          "id": 1,
          "productId": 1,
          "productName": "Esmeralda Colombiana Premium",
          "productImage": "https://example.com/image1.jpg",
          "quantity": 2,
          "unitPrice": 1500.00,
          "totalPrice": 3000.00
        }
      ],
      "shippingAddress": {
        "street": "123 Main St",
        "city": "Bogotá",
        "state": "Cundinamarca",
        "postalCode": "11001",
        "country": "CO"
      }
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "first": true,
  "numberOfElements": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "sorted": true,
    "unsorted": false
  },
  "empty": false
}
```

### **3. Obtener Detalle de Orden**
```bash
GET /api/v1/orders/{orderId}
```

**Headers:**
```
Authorization: Bearer {user_token}
```

**Respuesta Esperada (Spring Boot):**
```json
{
  "id": "ord_1234567890abcdef",
  "status": "completed",
  "total": 3000.00,
  "currency": "USD",
  "paymentMethod": "paypal",
  "paymentId": "PAY-1234567890",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:05:00Z",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Esmeralda Colombiana Premium",
      "productImage": "https://example.com/image1.jpg",
      "quantity": 2,
      "unitPrice": 1500.00,
      "totalPrice": 3000.00,
      "productDetails": {
        "origin": "Colombia",
        "certification": "GIA",
        "clarity": "VS1",
        "color": "Verde",
        "caratWeight": 2.5,
        "lengthMm": 8.5,
        "widthMm": 6.2
      }
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "postalCode": "11001",
    "country": "CO"
  },
  "paymentDetails": {
    "transactionId": "PAY-1234567890",
    "paymentStatus": "completed",
    "paymentDate": "2024-01-15T10:05:00Z",
    "paymentMethod": "paypal"
  }
}
```

### **4. Actualizar Estado de Orden**
```bash
PATCH /api/v1/orders/{orderId}/status
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {user_token}
```

**Body:**
```json
{
  "status": "completed",
  "paymentId": "PAY-1234567890"
}
```

**Respuesta Esperada (Spring Boot):**
```json
{
  "id": "ord_1234567890abcdef",
  "status": "completed",
  "paymentId": "PAY-1234567890",
  "updatedAt": "2024-01-15T10:05:00Z"
}
```

## 🔧 **Configuración del Frontend**

### **Variables de Entorno**
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## 📊 **Estructura de Base de Datos para Spring Boot**

### **Entidad: Order**
```java
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;
    
    @Column(length = 3)
    private String currency = "USD";
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "payment_id")
    private String paymentId;
    
    @Column(name = "shipping_address", columnDefinition = "JSON")
    private String shippingAddress;
    
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> items;
    
    // Getters, setters, constructors...
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

public enum OrderStatus {
    PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED
}
```

### **Entidad: OrderItem**
```java
@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "product_name", nullable = false)
    private String productName;
    
    @Column(name = "product_image")
    private String productImage;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @Column(name = "product_details", columnDefinition = "JSON")
    private String productDetails;
    
    // Getters, setters, constructors...
}
```

## 🔐 **Autenticación JWT**

### **Configuración de Seguridad**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/orders/**").authenticated()
                .requestMatchers("/api/v1/emeralds/**").permitAll()
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); // 1 hora de cache para preflight
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## 🚀 **Implementación del Controller**

### **OrderController**
```java
@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
    
    @GetMapping
    public ResponseEntity<Page<Order>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "all") String status) {
        
        Page<Order> orders = orderService.getOrders(page, size, status);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }
    
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody UpdateOrderStatusRequest request) {
        
        Order order = orderService.updateOrderStatus(orderId, request);
        return ResponseEntity.ok(order);
    }
}
```

## 📝 **Notas Importantes para Spring Boot**

1. **Paginación**: Spring Boot usa `page=0` como primera página (no `page=1`)
2. **Respuestas**: Las respuestas son directas, no envueltas en `{success: true, data: ...}`
3. **Paginación**: Usa el formato `Page<T>` de Spring Data
4. **CORS**: Configurar CORS para permitir requests desde `http://localhost:3000`
5. **JWT**: Implementar filtro JWT para autenticación
6. **Validación**: Usar `@Valid` y `@Validated` para validar requests
7. **Excepciones**: Usar `@ControllerAdvice` para manejo global de excepciones

## ⚠️ **Solución para PropertyReferenceException**

Si obtienes el error `No property 'createdAt' found for type 'Order'`, es porque Spring Data JPA no puede encontrar la propiedad. Esto puede suceder por:

### **1. Verificar nombres de propiedades**
Asegúrate de que los nombres de las propiedades en la entidad coincidan exactamente con los nombres de las columnas:

```java
// ❌ Incorrecto - nombres diferentes
@Column(name = "created_at")
private LocalDateTime createdAt; // Debería ser created_at

// ✅ Correcto - nombres coinciden
@Column(name = "created_at")
private LocalDateTime created_at;

// ✅ Alternativa - usar @Column con name
@Column(name = "created_at")
private LocalDateTime createdAt;
```

### **2. Verificar Repository**
Si usas Spring Data JPA con métodos de consulta, asegúrate de usar los nombres correctos:

```java
// ❌ Incorrecto
@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCreatedAt(LocalDateTime createdAt);
}

// ✅ Correcto - usar nombres de columnas
@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCreated_at(LocalDateTime created_at);
}

// ✅ Mejor - usar @Query
@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("SELECT o FROM Order o WHERE o.createdAt = :createdAt")
    List<Order> findByCreatedAt(@Param("createdAt") LocalDateTime createdAt);
}
```

### **3. Verificar base de datos**
Asegúrate de que las columnas existan en la base de datos:

```sql
DESCRIBE orders;
-- Debería mostrar:
-- id, user_id, status, total, currency, payment_method, payment_id, 
-- shipping_address, created_at, updated_at
```

## 🔧 **Ejemplos de cURL para Probar**

**Crear Orden:**
```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {user_token}" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "unitPrice": 1500.00,
        "totalPrice": 3000.00
      }
    ],
    "total": 3000.00,
    "currency": "USD",
    "paymentMethod": "paypal",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Bogotá",
      "state": "Cundinamarca",
      "postalCode": "11001",
      "country": "CO"
    }
  }'
```

**Obtener Órdenes (página 0):**
```bash
curl -X GET "http://localhost:8080/api/v1/orders?page=0&size=10&status=all" \
  -H "Authorization: Bearer {user_token}"
```

**Obtener Detalle:**
```bash
curl -X GET http://localhost:8080/api/v1/orders/ord_1234567890abcdef \
  -H "Authorization: Bearer {user_token}"
``` 