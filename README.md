# Weather Report App

Aplicación web moderna de pronóstico del tiempo construida con React + TypeScript.

## Características

### Funcionalidades Principales
- **Búsqueda inteligente** con debounce de medio segundo y autocompletado
- **Geolocalización** - Botón "Mi ubicación" para obtener el clima de tu ubicación actual
- **Historial de búsquedas** - Las últimas 5 ciudades consultadas (guardado en localStorage)
- **Pastillas interactivas** para acceso rápido al historial
- **Clima actual** con temperatura, descripción, máximas/mínimas y viento
- **Pronóstico por hora** para las 24 horas del día actual
- **Pronóstico de 7 días** con temperaturas máximas, mínimas y viento
- **Iconos dinámicos** según el codigo WMO del clima

> **Nota sobre búsqueda**: La búsqueda puede mostrar ciudades cuyos nombres no coinciden exactamente con el término buscado. Esto es normal, ya que la API de geocodificación incluye ciudades que contienen el término de búsqueda en alguno de sus campos (nombres alternativos, subdivisiones administrativas, etc.), aunque no sea el nombre principal.
### Diseño y UX
- **Tema azul oscuro premium** con gradientes
- **Efectos glassmorphism** (cristal esmerilado)
- **Animaciones suaves** en todos los elementos
- **Efectos hover** interactivos
- **Diseño centrado** y responsive
- **Efectos de brillo** y sombras dinámicas
- **Transiciones fluidas** entre estados

## 📋Requisitos

- Node.js 18+ 
- npm o yarn

##  Instalación

1. Clona el repositorio
```bash
git clone <link del respositorio>
cd weather-report
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con tu API key de OpenWeather:

```bash
VITE_OPEN_WEATHER_GEOCODING_API_KEY=tu_api_key_aqui
```

> **Importante**: La API key es necesaria para la función de **"Mi ubicación"** que utiliza geocodificación inversa. Puedes obtener una API key gratuita en:
> [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api)

4. Inicia el servidor de desarrollo
```bash
npm run dev
```

5. Abre tu navegador en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/              # Componentes reutilizables
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── LocationButton.tsx
│   │   └── Layout.tsx
│   ├── search/              # Búsqueda y historial
│   │   ├── SearchBar.tsx
│   │   └── SearchHistory.tsx
│   └── weather/             # Componentes de clima
│       ├── CurrentWeather.tsx
│       ├── HourlyForecast.tsx
│       └── DailyForecast.tsx
├── hooks/                   # Custom hooks
│   ├── useCitySearch.ts     # Búsqueda con debounce
│   ├── useGeolocation.ts    # Geolocalización del navegador
│   ├── useSearchHistory.ts  # Persistencia localStorage
│   └── useWeather.ts        # Datos del clima
├── services/                # APIs
│   ├── geocodingApi.ts      # Geocodificación y reverse geocoding
│   └── weatherApi.ts        # Datos del clima
├── types/                   # Definiciones TypeScript
│   ├── mapped/              # Tipos transformados
│   └── raw/                 # Tipos de respuesta API
└── utils/                   # Utilidades
    └── iconMapper.ts        # Mapeo de iconos WMO a SVG
```

## 🎨 Paleta de Colores

### Colores Principales
- **Background**: Gradiente `#0f2027 → #203a43 → #2c5364`
- **Tarjetas**: Glassmorphism con `rgba(255,255,255,0.1)`
- **Texto principal**: `#ffffff`
- **Texto secundario**: `#B0C4DE`
- **Acentos**: `#6495ED`, `#87CEEB`
- **Error**: `#FF6B6B`

### Efectos Visuales
- **Backdrop Filter**: `blur(20px)` para efecto cristal
- **Box Shadows**: Sombras con tonos azules
- **Borders**: Bordes semitransparentes `rgba(255,255,255,0.2)`
- **Animaciones**: Fade in, slide, float, shimmer

## Tecnologías Utilizadas

- **React 18** con Hooks
- **TypeScript** para type safety
- **Vite** como build tool
- **Axios** para peticiones HTTP
- **Open-Meteo API** para datos del clima y geolocalizacion
- **OpenWeather API** para geolocalizacion inversa

##  APIs Utilizadas

- [Open-Meteo Weather API](https://open-meteo.com/en/docs) - Datos del clima
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - Búsqueda de ciudades y coordenadas
- [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api) - Geocoding inverso

## Flujo de la Aplicación

1. Usuario escribe nombre de ciudad en el campo de búsqueda
2. Después de medio segundo (debounce), se realiza la peticion http
3. Se muestran resultados con ciudades que coinciden
4. Usuario selecciona una ciudad específica
5. Se obtienen las coordenadas (latitud/longitud)
6. Se consulta el clima usando esas coordenadas
7. Se muestran tres secciones:
   - Clima actual (tarjeta grande)
   - Pronóstico por hora (tarjeta horizontal)
   - Pronóstico de 7 días (tarjetas en grid)

## Decisiones Técnicas

### Arquitectura de Componentes
- Separación clara entre presentación y lógica
- Custom hooks para encapsular lógica de negocio
- Props tipadas con TypeScript

### Manejo de Estado
- useState para estado local
- useEffect con debounce para búsquedas
- Estado de loading y error en cada operación

### Transformación de Datos
- Separación entre tipos Raw (API) y Mapped (app)
- Mapeo centralizado en services
- Validación de datos antes de renderizar

### Performance
- Debounce de 1 segundo en búsquedas
- Limitación de resultados (24h, 7 días)
- Componentes optimizados

## Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Preview del build
npm run lint         # Ejecuta ESLint
```

##  Mejoras Futuras

- [ ] Internacionalización (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Gráficos de temperatura
- [ ] Toggle entre °C y °F
- [ ] Más datos meteorológicos (humedad, presión, UV, etc.)

##  Autor

Kevinho71
