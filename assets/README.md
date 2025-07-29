# Assets Folder

Esta carpeta contiene los recursos multimedia para la experiencia VR.

## Imagen 360° del Laboratorio

**Archivo:** `mirai_lab.jpg`

Esta imagen 360° muestra el laboratorio de robótica Mirai con:
- Robots humanoides en desarrollo
- Robot Pepper (social)
- Robot cuadrúpedo
- Estaciones de investigación
- Equipamiento de IA

### Instrucciones para agregar la imagen:

1. **Coloca la imagen** `mirai_lab.jpg` en esta carpeta
2. **Formato recomendado:** JPG o PNG
3. **Resolución:** Mínimo 2048x1024, ideal 4096x2048
4. **Proyección:** Equirectangular (360° horizontal, 180° vertical)

### Estructura de archivos:
```
assets/
├── mirai_lab.jpg          # Imagen 360° del laboratorio
├── mirai_lab_thumb.jpg    # Miniatura (opcional)
└── README.md              # Este archivo
```

### Notas técnicas:
- La imagen debe ser **equirectangular** para funcionar correctamente
- A-Frame automáticamente la mapea como skybox
- El radio del skybox está configurado a 100 unidades
- La imagen se carga dinámicamente cuando se entra en VR 