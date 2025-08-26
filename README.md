# 🥽 GCA Virtual - Plataforma Educativa WebXR

Una plataforma educativa web con experiencia VR inmersiva para Oculus Quest 3.

## 🚀 Características

- **Login simple** con LocalStorage
- **Dashboard** con información de sesión y badges
- **Experiencia VR** con imagen 360° del Laboratorio Mirai
- **Compatible con Oculus Quest 3**
- **Diseño responsive** para móviles y desktop

## 📁 Estructura del Proyecto

```
IKAN_VR/
├── 📄 index.html                    # Página de login
├── 📁 pages/                        # Páginas de la aplicación
│   ├── 📄 dashboard.html            # Dashboard principal
│   ├── 📄 badges.html               # Página de badges
│   └── 📁 vr/                       # Experiencias VR
│       └── 📄 quest3-vr-simple-hands.html  # Experiencia VR (funcionando)
├── 📁 css/                          # Estilos
├── 📁 js/                           # JavaScript
├── 📁 assets/                       # Recursos multimedia
├── 📁 docs/                         # Documentación
├── 📁 scripts/                      # Scripts de configuración
└── 📄 README.md                     # Este archivo
```

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd IKAN_VR
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar HTTPS (requerido para WebXR)

#### **Opción A: Cloudflare Tunnel (Recomendado)**
```bash
# Instalar Cloudflare Tunnel
npm install -g cloudflared

# Iniciar servidor local
npm start

# En otra terminal, crear túnel HTTPS
npm run cloudflare
```

#### **Opción B: Certificados SSL Locales**
```bash
# En Windows (PowerShell)
.\scripts\generate-ssl-cert.ps1

# En Linux/Mac
chmod +x scripts/generate-ssl-cert.sh
./scripts/generate-ssl-cert.sh

# Iniciar con HTTPS
npm run start-https
```

#### **Opción C: Live Server con HTTPS**
```bash
# Iniciar directamente con HTTPS
npm run dev-https
```

### 4. Acceder a la aplicación
- **URL local**: `http://localhost:8000`
- **URL HTTPS local**: `https://localhost:8000` (con certificados locales)
- **URL HTTPS pública**: Usar la URL de Cloudflare Tunnel

## 🔐 Credenciales de Login

Para acceder al sistema, usa estas credenciales:

- **Email**: `admin@gca.com`
- **Contraseña**: `admin123`

## 🥽 Experiencia VR

### Características de la VR:
- **Imagen 360°**: Laboratorio Mirai como fondo
- **Renderizado optimizado**: Three.js con configuración para Quest 3
- **Sesión estable**: Sin colgadas ni errores
- **Compatibilidad**: Funciona en Oculus Quest 3

### Para usar en Quest 3:
1. **Accede desde el navegador** del Quest 3
2. **Haz login** con las credenciales
3. **Ve al dashboard** y haz clic en "Entrar a la Sesión"
4. **Disfruta** de la experiencia VR

## 🎯 Funcionalidades

### Login
- ✅ Autenticación con LocalStorage
- ✅ Validación de campos
- ✅ Redirección al dashboard

### Dashboard
- ✅ Información de sesión del mes
- ✅ Sistema de badges/logros
- ✅ Botón para entrar a VR
- ✅ Diseño responsive

### VR Experience
- ✅ Carga sin colgarse
- ✅ Imagen 360° visible
- ✅ Compatible con Quest 3
- ✅ Renderizado estable

## 🔧 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **VR**: WebXR API, Three.js
- **Almacenamiento**: LocalStorage
- **Servidor**: Live Server (desarrollo)

## 🐛 Solución de Problemas

### VR no carga
1. **Verifica HTTPS**: WebXR requiere HTTPS
2. **Usa Cloudflare Tunnel o certificados locales**: Para desarrollo local
3. **Revisa la consola**: Para errores específicos

### Imagen 360° no aparece
1. **Verifica la ruta**: `assets/mirai_lab.jpg`
2. **Formato correcto**: JPG, 360° equirectangular
3. **Tamaño**: Recomendado 2048x1024 o mayor

### Quest 3 no detecta
1. **Navegador**: Usa el navegador integrado
2. **HTTPS**: Asegúrate de usar HTTPS
3. **Permisos**: Acepta permisos de WebXR

## 📝 Notas de Desarrollo

### Estado actual
- **Login**: ✅ Funcionando
- **Dashboard**: ✅ Funcionando  
- **VR Experience**: ✅ Funcionando (estática)
- **Inputs/Interactividad**: 🔄 Pendiente (se agregará cuando sea necesario)

## 🚀 Próximos Pasos

1. **Agregar interactividad** cuando sea requerida
2. **Implementar backend** para datos persistentes
3. **Más experiencias VR** con diferentes entornos
4. **Sistema de progreso** más avanzado

---

**Desarrollado para GCA Virtual** 🎓 #IKAN