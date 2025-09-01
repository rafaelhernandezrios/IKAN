# 🥽 VR Enhanced System - Guía Completa

## Descripción General

El sistema VR Enhanced de Laboratorio Mirai proporciona una experiencia virtual inteligente que se adapta automáticamente a las capacidades del dispositivo del usuario. Si WebXR está disponible, habilita el modo VR completo; si no, proporciona controles de teclado y ratón como respaldo.

## 🌟 Características Principales

### ✅ Detección Automática de VR
- Verifica automáticamente si WebXR está disponible
- Detecta si el dispositivo soporta VR inmersivo
- Habilita el modo apropiado sin intervención del usuario

### 🎮 Controles Inteligentes
- **Modo VR**: Controles VR nativos con hand tracking y controllers
- **Modo Fallback**: Controles de teclado (WASD) y ratón para navegación
- **Transición Suave**: Cambio automático entre modos

### 📱 Compatibilidad Universal
- Funciona en VR headsets (Quest, Rift, etc.)
- Compatible con computadoras de escritorio
- Funciona en dispositivos móviles
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🚀 Cómo Usar

### 1. Acceso a la Experiencia VR

```html
<!-- Página principal de demo -->
<a href="pages/vr/vr-demo.html">Demo VR Enhanced</a>

<!-- Experiencia VR mejorada -->
<a href="pages/vr/aframe-vr-enhanced.html">Experiencia VR</a>

<!-- Versión original -->
<a href="pages/vr/quest3-vr-simple-hands.html">VR Original</a>
```

### 2. Controles por Modo

#### 🥽 Modo VR (Cuando está disponible)
- **Movimiento**: Controles VR nativos
- **Interacción**: Hand tracking o VR controllers
- **Navegación**: Movimiento físico en el espacio VR
- **Interacción**: Gatillo de controller o gestos de mano

#### ⌨️ Modo Teclado (Fallback)
- **Movimiento**: 
  - `W` / `↑` - Avanzar
  - `S` / `↓` - Retroceder
  - `A` / `←` - Izquierda
  - `D` / `→` - Derecha
- **Rotación**: Ratón (click para activar pointer lock)
- **Interacción**: Click del ratón en objetos

### 3. Interacciones Disponibles

#### 🤖 Robots Interactivos
- **Pepper Robot**: Información sobre el robot humanoide
- **Unitree Go2**: Información y video 360° del robot perro
- **Cubo Interactivo**: Objeto manipulable en VR

#### 🎥 Contenido Multimedia
- Videos 360° inmersivos
- Paneles de información dinámicos
- Animaciones y efectos visuales

## 🛠️ Implementación Técnica

### Componente Principal: `vr-fallback-controls`

```javascript
// Registro del componente
AFRAME.registerComponent('vr-fallback-controls', {
    schema: {
        movementSpeed: { type: 'number', default: 0.1 },
        rotationSpeed: { type: 'number', default: 2.0 },
        enableKeyboard: { type: 'boolean', default: true },
        enableMouse: { type: 'boolean', default: true }
    }
});
```

### Uso en A-Frame

```html
<a-entity 
    id="camera" 
    position="0 1.6 0" 
    camera 
    look-controls="enabled: false" 
    wasd-controls="enabled: false" 
    vr-fallback-controls="movementSpeed: 0.1; rotationSpeed: 2.0">
</a-entity>
```

### Detección de VR

```javascript
// Verificación automática
if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        if (supported) {
            // Habilitar modo VR
            this.showVRButton();
        } else {
            // Habilitar controles de fallback
            this.enableFallbackMode();
        }
    });
}
```

## 📁 Estructura de Archivos

```
pages/vr/
├── vr-demo.html              # Página de demostración
├── aframe-vr-enhanced.html   # Experiencia VR mejorada
├── quest3-vr-simple-hands.html # Versión original
└── ...

js/
├── vr-components.js          # Componentes VR personalizados
└── ...

assets/
├── mirai_lab.jpg            # Skybox del laboratorio
├── go2.mp4                  # Video 360° del robot
└── ...
```

## 🎯 Casos de Uso

### 1. Dispositivo con VR
- Usuario ve botón "🥽 ENTRAR VR"
- Al hacer clic, entra en modo VR completo
- Controles VR nativos activos
- Hand tracking disponible (Quest 3)

### 2. Dispositivo sin VR
- Controles de teclado automáticamente habilitados
- Instrucciones claras sobre controles
- Experiencia completa sin VR

### 3. Error de Detección
- Fallback automático a controles de teclado
- Mensaje informativo sobre el estado
- Funcionalidad completa preservada

## 🔧 Configuración Avanzada

### Personalización de Controles

```javascript
// Configurar velocidad de movimiento
vr-fallback-controls="movementSpeed: 0.15; rotationSpeed: 1.5"

// Deshabilitar controles específicos
vr-fallback-controls="enableKeyboard: false; enableMouse: true"
```

### Eventos Personalizados

```javascript
// Escuchar eventos VR
scene.addEventListener('vr-action', function(event) {
    const action = event.detail.action;
    const element = event.target;
    
    if (action === 'showInfo') {
        showObjectInfo(element);
    }
});
```

## 🐛 Solución de Problemas

### VR No Se Activa
1. Verificar que el navegador soporte WebXR
2. Asegurar que el dispositivo tenga capacidades VR
3. Revisar permisos del navegador

### Controles de Teclado No Funcionan
1. Verificar que el foco esté en la página
2. Comprobar que no haya conflictos con otros scripts
3. Revisar la consola del navegador para errores

### Rendimiento Lento
1. Reducir `movementSpeed` y `rotationSpeed`
2. Optimizar modelos 3D y texturas
3. Verificar especificaciones del dispositivo

## 🌐 Compatibilidad de Navegadores

| Navegador | VR Support | Fallback Controls |
|-----------|------------|-------------------|
| Chrome    | ✅         | ✅                |
| Firefox   | ✅         | ✅                |
| Safari    | ⚠️         | ✅                |
| Edge      | ✅         | ✅                |

## 📞 Soporte

Para problemas técnicos o preguntas sobre la implementación:

1. Revisar la consola del navegador para errores
2. Verificar la compatibilidad del dispositivo
3. Consultar la documentación de WebXR
4. Contactar al equipo de desarrollo

---

**Desarrollado por Laboratorio Mirai Innovation** 🚀
*Experiencias virtuales del futuro, accesibles hoy*
