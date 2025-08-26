# 🚀 Guía de Inicio Rápido

## ⚡ Configuración en 3 Pasos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar HTTPS (Elige una opción)

#### **Opción A: Cloudflare Tunnel (Recomendado)**
```bash
npm install -g cloudflared
npm start
npm run cloudflare
```

#### **Opción B: Certificados Locales**
```bash
# Windows
npm run setup-windows
npm run start-https

# Linux/Mac
npm run setup-linux
npm run start-https
```

### 3. Acceder a la Aplicación
- **URL**: `https://localhost:8000` (local) o URL de Cloudflare
- **Email**: `admin@gca.com`
- **Contraseña**: `admin123`

## 🥽 Probar VR en Quest 3

1. **Abre el navegador** del Quest 3
2. **Ve a la URL** de tu aplicación
3. **Haz login** con las credenciales
4. **Haz clic** en "Entrar a la Sesión"
5. **Disfruta** de la experiencia VR

## 🔧 Comandos Útiles

```bash
npm start              # Servidor HTTP local
npm run dev            # Live Server con recarga
npm run cloudflare     # Cloudflare Tunnel
npm run start-https    # HTTPS local
```

## 🐛 Solución de Problemas

### VR no funciona
- ✅ Verifica que uses HTTPS
- ✅ Acepta permisos de WebXR
- ✅ Usa el navegador integrado del Quest 3

### Error de certificado
- ✅ Haz clic en "Avanzado" → "Continuar"
- ✅ Es normal en certificados locales

### Imagen no aparece
- ✅ Verifica que `assets/mirai_lab.jpg` existe
- ✅ Formato: JPG, 360° equirectangular

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de usar HTTPS
