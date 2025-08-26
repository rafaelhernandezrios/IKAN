# ⚙️ Configuración del Proyecto

## 🔧 Scripts Disponibles

### Desarrollo
```bash
npm start          # Servidor HTTP local
npm run dev        # Live Server con recarga automática
```

### HTTPS
```bash
npm run start-https    # Servidor HTTPS con certificados locales
npm run dev-https      # Live Server con HTTPS
npm run cloudflare     # Cloudflare Tunnel (recomendado)
```

### Configuración SSL
```bash
npm run setup-windows  # Generar certificados SSL en Windows
npm run setup-linux    # Generar certificados SSL en Linux/Mac
```

## 🌐 URLs de Acceso

### Desarrollo Local
- **HTTP**: `http://localhost:8000`
- **HTTPS Local**: `https://localhost:8000`

### Cloudflare Tunnel
- **URL Pública**: Se genera automáticamente al ejecutar `npm run cloudflare`

## 🔐 Credenciales

### Usuario Administrador
- **Email**: `admin@gca.com`
- **Contraseña**: `admin123`

### Usuarios de Prueba
- **Email**: `user1@gca.com`
- **Contraseña**: `user123`

## 📁 Estructura de Archivos

### Archivos Principales
- `index.html` - Página de login
- `dashboard.html` - Dashboard principal
- `quest3-vr-simple-hands.html` - Experiencia VR

### Carpetas
- `css/` - Estilos CSS
- `js/` - JavaScript del proyecto
- `assets/` - Recursos multimedia
- `docs/` - Documentación
- `scripts/` - Scripts de configuración

## 🛠️ Configuración de Entorno

### Requisitos
- Node.js 14+
- npm o yarn
- Navegador compatible con WebXR

### Dependencias
```bash
npm install
```

### Variables de Entorno
No se requieren variables de entorno para el desarrollo local.

## 🔧 Personalización

### Cambiar Imagen 360°
1. Reemplaza `assets/mirai_lab.jpg`
2. Formato: JPG, 360° equirectangular
3. Tamaño recomendado: 2048x1024 o mayor

### Modificar Credenciales
Edita `js/auth.js` para cambiar las credenciales de acceso.

### Personalizar Estilos
Modifica los archivos en `css/` para cambiar la apariencia.

## 🚀 Despliegue

### Desarrollo
```bash
npm start
```

### Producción
1. Configurar servidor web (Apache, Nginx)
2. Habilitar HTTPS
3. Configurar dominio

### Cloudflare Pages
1. Conectar repositorio a Cloudflare Pages
2. Configurar build settings
3. Desplegar automáticamente

## 📝 Notas Técnicas

### WebXR
- Requiere HTTPS para funcionar
- Compatible con Oculus Quest 3
- Usa Three.js para renderizado

### Almacenamiento
- LocalStorage para datos de sesión
- No requiere base de datos

### Seguridad
- Autenticación básica con LocalStorage
- Para producción, implementar backend seguro
