# Decisiones Técnicas - Weather Report App

Este documento explica las decisiones de diseño y arquitectura tomadas durante el desarrollo de la aplicación.

---

## Uso de Dos APIs Diferentes

### Open-Meteo API
- **Propósito**: Datos meteorológicos y geocodificación directa
- **Ventajas**:
  - API gratuita sin necesidad de registro
  - Excelente documentación y datos precisos
  - No requiere API key para desarrollo rápido
  - Endpoints específicos para búsqueda de ciudades y datos del clima

### OpenWeather Geocoding API
- **Propósito**: Geocodificación inversa (coordenadas → nombre de ciudad)
- **Razón de uso**:
  - Open-Meteo no ofrece geocodificación inversa
  - Necesario para la funcionalidad "Mi ubicación"
  - OpenWeather es el estándar de la industria para este caso de uso
  - Permite convertir lat/lon del navegador en nombre de ciudad legible

### ¿Por qué no usar una sola API?
- **Open-Meteo** no tiene reverse geocoding
- **OpenWeather** requiere API key incluso para la versión gratuita (datos del clima)
- **Mejor práctica**: Usar cada API para su fortaleza específica

---

## 💾Uso de localStorage para Historial

### Decisión
Implementar persistencia del historial de búsquedas con `localStorage` en lugar de estado efímero.

### Justificación
- **Experiencia de usuario**: El historial se mantiene entre sesiones del navegador
- **Simplicidad**: No requiere backend ni base de datos
- **Performance**: Acceso instantáneo sin llamadas de red
- **Casos de uso reales**: Los usuarios suelen buscar las mismas ciudades repetidamente

### Implementación
- Límite de 5 ciudades recientes
- Estructura serializada en JSON
- Hook custom `useSearchHistory` para encapsular la lógica
- Prevención de duplicados

---

##  No Uso de useRef

### Contexto
En aplicaciones de clima, podría pensarse en usar `useRef` para almacenar datos previos y evitar re-renders.

### Decisión: No usar useRef para datos del clima

### Razones
1. **Los datos meteorológicos son volátiles**
   - El clima cambia constantemente
   - Cada consulta debe reflejar datos actuales
   - No tiene sentido mantener referencias antiguas

2. **No hay problema de performance**
   - Las consultas no son frecuentes (solo cuando el usuario busca)
   - El debounce ya optimiza las llamadas a la API

3. **Simplicidad del estado**
   - `useState` es más declarativo y fácil de entender
   - Los re-renders son deseables para mostrar datos frescos
   - No hay cálculos costosos que justifiquen optimización

### Cuándo sí usar useRef
- Referencias a elementos DOM (no aplicable aquí)
- Valores que no deben causar re-render (no es nuestro caso)
- Almacenar IDs de timers (ya usamos useEffect cleanup)

---

##  Despliegue: Netlify vs Docker

### Decisión
Desplegar el build estático en **Netlify** sin usar Docker.

### Justificación

#### ¿Por qué Netlify?
- **Aplicación estática**: React se compila a HTML/CSS/JS
- **Sin backend**: No hay servidor Node.js en producción
- **CDN global**: Netlify distribuye los archivos automáticamente
- **CI/CD integrado**: Deploy automático desde Git
- **Gratuito**: Tier free más que suficiente para este proyecto
- **HTTPS automático**: Certificados SSL sin configuración

#### ¿Por qué NO Docker?
- **Sobreingeniería**: Docker es para aplicaciones con backend, bases de datos, microservicios
- **Complejidad innecesaria**: 
  - Configurar Dockerfile
  - Gestionar imágenes y contenedores
  - Configurar orquestación (Kubernetes, Docker Compose)
  - Mantener infraestructura
- **Costos**: Requeriría un servidor (AWS EC2, DigitalOcean, etc.)
- **Performance**: Un CDN (Netlify) es más rápido que un servidor único

#### Cuándo sí usar Docker
- Aplicaciones con backend propio
- Bases de datos y servicios adicionales
- Necesidad de control total del entorno
- Microservicios complejos
- Requisitos específicos del sistema operativo

### Nuestro stack de despliegue
```
React (build) → Vite → Static files → Netlify CDN → Usuario
```

Simple, efectivo, y apropiado para una SPA.

---

## Custom Hooks

### Decisión
Crear hooks personalizados para encapsular lógica compleja.

### Hooks implementados

#### `useCitySearch`
- **Propósito**: Gestionar búsqueda con debounce
- **Razón**: Evitar llamadas excesivas a la API
- **Beneficio**: Reutilizable y testeable

#### `useWeather`
- **Propósito**: Obtener y gestionar datos del clima
- **Razón**: Separar lógica de presentación
- **Beneficio**: Estado y efectos secundarios aislados

#### `useSearchHistory`
- **Propósito**: Gestionar persistencia en localStorage
- **Razón**: Encapsular lógica de almacenamiento
- **Beneficio**: Puede cambiar implementación sin afectar componentes

#### `useGeolocation`
- **Propósito**: Obtener ubicación del navegador
- **Razón**: Manejar permisos y errores del navegador
- **Beneficio**: Abstracción de la API del navegador

### Ventajas de esta arquitectura
- **Separación de responsabilidades**
- **Código más limpio y mantenible**
- **Reutilización de lógica**
- **Testing más sencillo**

---

## 🎨Arquitectura de Estilos

### Decisión
CSS modular con metodología BEM y variables CSS.

### ¿Por qué no CSS-in-JS (styled-components, emotion)?
- **Simplicidad**: Proyecto pequeño/mediano
- **Performance**: CSS nativo es más rápido
- **Separación de responsabilidades**: Estilos separados de lógica
- **Familiaridad**: CSS puro es universal

### ¿Por qué no Tailwind CSS?
- **Control fino**: Efectos glassmorphism personalizados
- **Animaciones complejas**: Keyframes y transiciones específicas
- **Aprendizaje**: Demostrar conocimiento de CSS puro
- **Bundle size**: Sin dependencias adicionales

### Estructura elegida
```
styles/
├── reset.css          # Normalización
├── index.css          # Variables globales
├── layout.css         # Layout principal
└── components/        # Estilos por componente
```

**Ventajas**:
- Estilos coubicados con componentes
- Variables CSS para temas
- Media queries responsivas
- BEM para especificidad clara

---

##  Manejo de Estado

### Decisión
Solo `useState` y `useEffect`, sin Redux ni Context API.

### Justificación
- **Simplicidad**: No hay estado global complejo
- **Prop drilling mínimo**: Máximo 2 niveles de componentes
- **Performance adecuada**: No hay miles de componentes
- **Mantenibilidad**: Menos abstracciones = código más claro

### Cuándo sí usar gestión de estado global
- Datos compartidos en múltiples niveles de componentes
- Estado de autenticación
- Temas dinámicos
- Carritos de compra, etc.

**Nuestro caso**: Cada sección maneja su propio estado de forma independiente.

---

##  Performance

### Optimizaciones implementadas

#### Debounce (500ms)
- **Problema**: Llamada API por cada tecla presionada
- **Solución**: Esperar medio segundo sin actividad
- **Resultado**: Menos peticiones HTTP, mejor UX

#### Límite de resultados
- **Búsqueda**: Limitado por la API
- **Pronóstico por hora**: Solo 24 horas
- **Pronóstico diario**: Solo 7 días
- **Resultado**: Menos datos procesados y renderizados

#### No hay optimizaciones prematuras
- **Sin React.memo**: No hay re-renders costosos
- **Sin useMemo/useCallback**: No hay cálculos pesados
- **Sin virtualización**: Listas pequeñas

**Regla**: Optimizar solo cuando hay un problema medible.

---


##  Separación de Tipos (Raw vs Mapped)

### Decisión
Crear tipos separados para respuestas de API (raw) y datos de aplicación (mapped).

### Estructura
```typescript
types/
├── raw/
│   ├── weatherRaw.types.ts
│   ├── geocodingRaw.type.ts
│   └── reverseGeocodingRaw.type.ts
└── mapped/
    ├── weatherMapped.types.ts
    ├── geocodingMapped.type.ts
    └── reverseGeocodingMapped.type.ts
```

### Justificación
1. **Desacoplamiento**: Si la API cambia, solo se modifica el servicio
2. **Claridad**: Se sabe qué datos vienen de la API y cuáles usa la app
3. **Type safety**: TypeScript valida transformaciones
4. **Documentación**: Los tipos documentan contratos de datos


---

##  Sin Filtrado Exacto de Nombres

### Decisión
**Eliminar** el filtro de coincidencia exacta en búsqueda de ciudades.

### Razón original del filtro
Evitar resultados confusos mostrando solo ciudades con nombre exacto.

### Por qué se eliminó
1. **UX mejorada**: Usuarios no necesitan escribir con mayúsculas, acentos o puntuación exacta
2. **Datos de API ricos**: La API incluye ciudades con nombres alternativos
3. **Flexibilidad**: "San Juan" puede encontrar "San Juan de los Lagos", "San Juan del Río", etc.
4. **Mejores resultados**: Más opciones útiles para el usuario

### Trade-off aceptado
Algunos resultados pueden parecer no coincidentes, pero están correctos según los datos de origen de la API.

---

##  Arquitectura General

### Principios seguidos
- **Separation of Concerns**: Cada archivo tiene una responsabilidad clara
- **DRY (Don't Repeat Yourself)**: Hooks y utilidades reutilizables
- **KISS (Keep It Simple, Stupid)**: Sin abstracciones innecesarias
- **YAGNI (You Aren't Gonna Need It)**: Solo features necesarias

### Flujo de datos
```
Usuario → Componente → Hook → Service → API
                               ↓
Usuario ← Componente ← Hook ← Tipos Mapped
```

### Convenciones
- TypeScript strict mode
- Nombres descriptivos en español para variables de negocio
- Comentarios solo donde agregan valor
- Estructura de carpetas por feature
