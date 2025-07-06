# 🔧 Configuración de CORS para Spring Boot - Alma Esmeralda

## 🚨 **Problema Actual**
```
Access to fetch at 'http://localhost:8080/orders' from origin 'http://localhost:3000' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ **Solución Completa**

### **1. Configuración de Seguridad Spring Boot**

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
        
        // Orígenes permitidos
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ));
        
        // Métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        
        // Headers permitidos
        configuration.setAllowedHeaders(Arrays.asList(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // Headers expuestos
        configuration.setExposedHeaders(Arrays.asList(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));
        
        // Permitir credenciales
        configuration.setAllowCredentials(true);
        
        // Cache de preflight (1 hora)
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### **2. Configuración Global de CORS (Alternativa)**

Si prefieres una configuración más simple, puedes usar `@CrossOrigin` en cada controller:

```java
@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(
    origins = {"http://localhost:3000", "http://127.0.0.1:3000"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true"
)
public class OrderController {
    // ... métodos del controller
}
```

### **3. Configuración de Application Properties**

```properties
# application.properties
spring.web.cors.allowed-origins=http://localhost:3000,http://127.0.0.1:3000
spring.web.cors.allowed-methods=GET,POST,PUT,PATCH,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600
```

### **4. Configuración de WebMvcConfigurer (Opcional)**

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

## 🔍 **Verificación de CORS**

### **1. Verificar Headers de Respuesta**

Usa las herramientas de desarrollador del navegador (F12) y ve a la pestaña Network:

1. Haz una petición al backend
2. Busca la respuesta en la pestaña Network
3. Verifica que incluya estos headers:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
```

### **2. Test con cURL**

```bash
# Test de preflight OPTIONS
curl -X OPTIONS http://localhost:8080/api/v1/orders \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v

# Deberías ver en la respuesta:
# Access-Control-Allow-Origin: http://localhost:3000
# Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
# Access-Control-Allow-Headers: Content-Type,Authorization
```

### **3. Test de Petición Real**

```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"test": "data"}' \
  -v
```

## 🚀 **Endpoints Actualizados**

### **Estructura de URLs**
```
GET    /api/v1/emeralds          - Obtener productos
POST   /api/v1/orders            - Crear orden
GET    /api/v1/orders            - Obtener órdenes
GET    /api/v1/orders/{id}       - Obtener orden específica
PATCH  /api/v1/orders/{id}/status - Actualizar estado
```

### **Configuración de Seguridad**
- `/api/v1/emeralds/**` - Público (sin autenticación)
- `/api/v1/orders/**` - Requiere autenticación JWT

## 🔧 **Solución de Problemas**

### **Error: "No 'Access-Control-Allow-Origin' header"**
1. Verifica que el backend esté ejecutándose
2. Confirma que la configuración de CORS esté aplicada
3. Reinicia el servidor Spring Boot
4. Verifica que no haya filtros que bloqueen las peticiones

### **Error: "Method not allowed"**
1. Verifica que el método HTTP esté en `allowedMethods`
2. Confirma que la ruta del endpoint sea correcta
3. Verifica que el controller esté mapeado correctamente

### **Error: "Credentials not supported"**
1. Asegúrate de que `allowCredentials` esté en `true`
2. Verifica que el origen esté en `allowedOrigins`
3. Confirma que no uses `allowedOriginPatterns` con `allowCredentials`

## 📝 **Notas Importantes**

1. **Orígenes**: Solo incluye los orígenes que realmente necesitas
2. **Credenciales**: Si usas `allowCredentials: true`, no puedes usar `*` en `allowedOrigins`
3. **Cache**: El `maxAge` ayuda a reducir las peticiones preflight
4. **Headers**: Incluye todos los headers que tu frontend envía
5. **Métodos**: Asegúrate de incluir `OPTIONS` para las peticiones preflight

## 🎯 **Resultado Esperado**

Después de aplicar esta configuración:

✅ Las peticiones desde `http://localhost:3000` funcionarán  
✅ Los headers CORS estarán presentes en las respuestas  
✅ Las peticiones preflight OPTIONS serán manejadas correctamente  
✅ El frontend podrá crear y gestionar órdenes sin errores de CORS 