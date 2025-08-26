# 🥽 GCA Virtual - Prompt Corto

## 📋 Descripción Rápida

**GCA Virtual** es una plataforma educativa WebXR que permite a usuarios explorar un laboratorio virtual 360° optimizado para Oculus Quest 3. Incluye sistema de login, dashboard con badges, y experiencia VR inmersiva.

## 🏗️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **VR**: Three.js + WebXR API
- **Almacenamiento**: LocalStorage
- **Servidor**: Live Server / Serve
- **HTTPS**: Cloudflare Tunnel (recomendado)

## 📁 Estructura Clave

```
IKAN_VR/
├── index.html                    # Login
├── dashboard.html                # Dashboard principal
├── quest3-vr-simple-hands.html  # Experiencia VR
├── css/                          # Estilos
├── js/                           # Lógica
├── assets/                       # Recursos (mirai_lab.jpg)
├── docs/                         # Documentación
└── scripts/                      # Configuración
```

## 🔐 Acceso

- **Admin**: `admin@gca.com` / `admin123`
- **User**: `user1@gca.com` / `user123`

## 🚀 Comandos Principales

```bash
npm install                    # Instalar dependencias
npm start                      # Servidor HTTP local
npm run cloudflare             # HTTPS público (recomendado)
npm run start-https            # HTTPS local
```

## 🥽 Características VR

- ✅ Imagen 360° del Laboratorio Mirai
- ✅ Compatibilidad completa con Quest 3
- ✅ Interacción con manos y controladores
- ✅ Renderizado optimizado con Three.js
- ✅ WebXR API implementada

## 🎯 Funcionalidades

- **Login**: Autenticación con LocalStorage
- **Dashboard**: Estadísticas y sistema de badges
- **VR Experience**: Entorno inmersivo 360°
- **Responsive**: Funciona en desktop, móvil y VR

## 🔧 Configuración HTTPS

**Opciones:**
1. **Cloudflare Tunnel** (Recomendado) - Túnel público
2. **Certificados SSL locales** - Desarrollo local
3. **Live Server HTTPS** - Desarrollo rápido

## 📱 Compatibilidad

- ✅ **Oculus Quest 3** (Principal)
- ✅ **Oculus Quest 2** (Compatible)
- ✅ **Navegadores WebXR** (Chrome, Firefox, Edge)
- ✅ **Dispositivos móviles** (Vista previa)

## 🐛 Problemas Comunes

1. **VR no carga** → Verificar HTTPS y permisos WebXR
2. **Imagen no aparece** → Verificar `assets/mirai_lab.jpg`
3. **Quest 3 no detecta** → Usar navegador integrado
4. **Error certificado** → Aceptar certificado local

## 🚀 Estado Actual

- ✅ **Login**: Funcionando
- ✅ **Dashboard**: Funcionando
- ✅ **VR Experience**: Funcionando (estática)
- 🔄 **Interactividad**: Pendiente

---

**Proyecto WebXR educativo completo y funcional para Oculus Quest 3.**
