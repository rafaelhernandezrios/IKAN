# Selector de Experiencia VR - Laboratorio Mirai

## Descripción

El **Selector de Experiencia VR** es una nueva funcionalidad que permite a los usuarios elegir la experiencia de realidad virtual más adecuada para su dispositivo antes de iniciar la exploración del Laboratorio Mirai.

## Características

### 🎯 **Detección Automática de Dispositivos**
- **VR**: Detecta dispositivos compatibles con WebXR (Meta Quest, HTC Vive, etc.)
- **Desktop**: Identifica computadoras de escritorio con navegadores estándar
- **Mobile**: Detecta smartphones y tablets con capacidades táctiles

### 🚀 **Experiencias Optimizadas**
- **Dispositivo VR**: Redirige a `quest3-vr-simple-hands.html` (experiencia nativa VR)
- **Desktop**: Redirige a `aframe-mirai-skybox-fixed.html` (controles de teclado/ratón)
- **Mobile**: Redirige a `aframe-mirai-skybox-fixed.html` (controles táctiles)

### 🗺️ **Integración con Selección de Ciudad**
- Mantiene la información de la ciudad seleccionada del dashboard
- Pasa parámetros de ciudad a las experiencias VR
- Muestra badge visual de la ciudad seleccionada

## Flujo de Usuario

### 1. **Desde el Dashboard**
```
Dashboard → Seleccionar País → Seleccionar Ciudad → Botón "Explorar en VR"
```

### 2. **Selector de Experiencia VR**
```
Pregunta: "¿En qué tipo de dispositivo estás?"
Opciones:
├── 🥽 Dispositivo VR (Meta Quest, HTC Vive, etc.)
├── 💻 Computadora/Desktop (Navegador web estándar)
└── 📱 Dispositivo Móvil (Smartphone o tablet)
```

### 3. **Redirección Inteligente**
- **VR**: `quest3-vr-simple-hands.html?city=Osaka&location=osaka-lab`
- **Desktop**: `aframe-mirai-skybox-fixed.html?city=Osaka&location=osaka-lab`
- **Mobile**: `aframe-mirai-skybox-fixed.html?city=Osaka&location=osaka-lab`

## Archivos del Sistema

### 📁 **Páginas HTML**
- `pages/vr/vr-experience-selector.html` - Página principal del selector
- `pages/vr/aframe-mirai-skybox-fixed.html` - Experiencia A-Frame
- `pages/vr/quest3-vr-simple-hands.html` - Experiencia VR nativa

### 📁 **JavaScript**
- `js/dashboard.js` - Lógica del dashboard y redirección al selector
- Funciones modificadas:
  - `startVRSession()` - Ahora redirige al selector en lugar de directamente a VR

### 📁 **Estilos**
- CSS integrado en `vr-experience-selector.html`
- Diseño responsive con glassmorphism
- Animaciones suaves y transiciones

## Implementación Técnica

### 🔍 **Detección de Dispositivos**
```javascript
function detectDevice() {
    // Detectar móvil por User Agent
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'mobile';
    }
    // Detectar VR por WebXR
    else if (navigator.xr) {
        return 'vr';
    }
    // Por defecto, desktop
    else {
        return 'desktop';
    }
}
```

### 🎮 **Selección de Experiencia**
```javascript
function selectExperience(experienceType) {
    // Obtener ciudad seleccionada del localStorage
    const selectedCity = localStorage.getItem('gca_virtual_selected_city');
    const selectedLocation = localStorage.getItem('gca_virtual_selected_location');
    
    // Construir URL con parámetros
    let targetUrl = getTargetUrl(experienceType);
    if (selectedCity && selectedLocation) {
        targetUrl += `?city=${encodeURIComponent(selectedCity)}&location=${encodeURIComponent(selectedLocation)}`;
    }
    
    // Redirigir
    window.location.href = targetUrl;
}
```

### 📱 **Responsive Design**
- **Desktop**: Layout vertical con botones grandes
- **Mobile**: Adaptación automática para pantallas pequeñas
- **Touch**: Optimizado para interacciones táctiles

## Personalización

### 🎨 **Modificar Estilos**
Los estilos están en la sección `<style>` del archivo HTML:
```css
.container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    /* ... más estilos ... */
}
```

### 🔧 **Agregar Nuevas Experiencias**
Para agregar una nueva experiencia:
1. Agregar nuevo botón en la sección `.options`
2. Agregar nuevo caso en `selectExperience()`
3. Definir la URL de destino

### 🌍 **Soporte Multiidioma**
El sistema está preparado para múltiples idiomas:
- Textos en español (configurable)
- Estructura HTML semántica
- Clases CSS reutilizables

## Beneficios

### ✅ **Para Usuarios**
- **Experiencia Optimizada**: Cada dispositivo obtiene la mejor versión
- **Interfaz Clara**: Selección simple y directa
- **Información Contextual**: Muestra la ciudad seleccionada

### ✅ **Para Desarrolladores**
- **Código Limpio**: Separación clara de responsabilidades
- **Fácil Mantenimiento**: Lógica centralizada en un archivo
- **Escalable**: Fácil agregar nuevas experiencias

### ✅ **Para el Sistema**
- **Mejor Rendimiento**: No carga experiencias innecesarias
- **Menor Confusión**: Usuarios van directo a la experiencia correcta
- **Trazabilidad**: Parámetros de ciudad se mantienen en toda la sesión

## Próximas Mejoras

### 🚀 **Funcionalidades Planificadas**
- [ ] Detección automática más precisa de dispositivos VR
- [ ] Previsualización de cada experiencia antes de seleccionar
- [ ] Configuración de preferencias del usuario
- [ ] Analytics de selección de dispositivos
- [ ] Soporte para más tipos de dispositivos (AR, MR)

### 🔧 **Optimizaciones Técnicas**
- [ ] Lazy loading de experiencias
- [ ] Cache de detección de dispositivos
- [ ] Fallback automático si una experiencia falla
- [ ] Métricas de rendimiento por tipo de dispositivo

## Soporte

### 📞 **Problemas Comunes**
1. **No se detecta dispositivo VR**: Verificar compatibilidad WebXR
2. **Redirección falla**: Verificar rutas de archivos
3. **Estilos no se aplican**: Verificar carga de CSS

### 🐛 **Debugging**
```javascript
// En consola del navegador
console.log('Device detected:', detectDevice());
console.log('Selected city:', localStorage.getItem('gca_virtual_selected_city'));
console.log('Selected location:', localStorage.getItem('gca_virtual_selected_location'));
```

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Autor**: Laboratorio Mirai  
**Compatibilidad**: WebXR, A-Frame, Navegadores modernos
