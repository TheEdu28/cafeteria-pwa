# U-COFFEE ☕

Sistema de pedidos para cafetería universitaria desarrollado como Progressive Web App (PWA).

## 📱 Prototipo Funcional

**URL Pública:** https://cafeteria-pwa-drab.vercel.app/

## 📚 Información del Curso

- **Materia:** Diseño y Evaluación de Interfaces de Usuario
- **Profesor:** Santana Mancilla Pedro Cesar
- **Integrantes del Equipo:**
  - Blanco Schulte Liz Fernanda
  - Garibay Solorzano Salvador
  - Hernandez Gonzalez Omar Yahir
  - Lazo Mora Jesús Eduardo
  - Velazquez Vargas Christian Alexis

## 🛠️ Tecnologías y Versiones

- **React:** 19.2.6
- **React Router:** 7.15.1
- **Vite:** 8.0.12
- **Tailwind CSS:** 4.3.0
- **vite-plugin-pwa:** 1.3.0
- **Lucide React:** 1.16.0 (Iconos)
- **Node.js:** 18+
- **npm:** 9+

## ✨ Funcionalidades Implementadas

- **Exploración del Menú:** Navega por categorías de productos disponibles
- **Personalización de Productos:** Selecciona tamaño, extras, y personaliza ingredientes (sin/añadir)
- **Carrito de Compras:** Añade productos y gestiona cantidades fácilmente
- **Realización de Pedidos:** Completa tu orden con selección de horario de recogida (pickup)
- **Historial de Pedidos:** Consulta tu historial y estado actual de órdenes
- **Sistema de Fidelización:** Acumula y canjea puntos de recompensa
- **Diseño Responsivo:** Adaptable a dispositivos móviles y escritorio
- **PWA Offline:** Accesible incluso sin conexión a internet

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm (versión 9 o superior)

### Pasos para Instalar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TheEdu28/cafeteria-pwa.git
   cd cafeteria-pwa
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados listos para despliegue.

### Preview de la Build de Producción

```bash
npm run preview
```

## 📦 Despliegue en Vercel

La aplicación está desplegada automáticamente en Vercel:

1. El repositorio está conectado a Vercel
2. Cada push a la rama principal dispara un nuevo despliegue
3. La aplicación está disponible en: https://cafeteria-pwa-drab.vercel.app/

### Desplegar Cambios
```bash
git add .
git commit -m "Tu mensaje de commit"
git push origin rama-eduardo
```

## 📱 Instalación como PWA

### En Android (Chrome)
1. Abre la aplicación en Chrome
2. Toca el menú (⋮) → "Instalar aplicación"
3. Toca "Instalar"
4. La app aparecerá en tu pantalla de inicio

### En iOS (Safari)
1. Abre la aplicación en Safari
2. Toca el botón de compartir (⬆️)
3. Desplázate y selecciona "Añadir a pantalla de inicio"
4. Confirma

### En Desktop
1. Abre la aplicación en navegador
2. En la barra de direcciones aparecerá el ícono de instalación
3. Haz clic para instalar como aplicación de escritorio

## 📁 Estructura del Proyecto

```
cafeteria-pwa/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── pages/              # Páginas principales
│   ├── context/            # Contexto de React (CartContext)
│   ├── data/               # Datos estáticos (menú)
│   ├── hooks/              # Hooks personalizados
│   ├── styles/             # Estilos globales
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                 # Archivos estáticos
│   ├── icon-192.png       # Icono PWA 192x192
│   ├── icon-512.png       # Icono PWA 512x512
│   └── ImagenesMenu/      # Imágenes de productos
├── docs/                   # Documentación adicional
├── index.html
├── vite.config.js         # Configuración de Vite y PWA
├── package.json
├── tailwind.config.js
└── README.md              # Este archivo
```

## 🔧 Configuración PWA

El archivo `vite.config.js` contiene la configuración de PWA:
- Actualización automática del service worker
- Manifest con información de la app
- Iconos para diferentes resoluciones

## 📊 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Vista previa del build
- `npm run lint` - Ejecuta ESLint para verificar código

## 🤖 Uso de Inteligencia Artificial

El equipo ha utilizado herramientas de inteligencia artificial durante el desarrollo de esta aplicación:

### Herramientas Utilizadas
- **GitHub Copilot:** Generación de código y autocomplete
- **ChatGPT:** Estructura del proyecto, recomendaciones de diseño y documentación

### Tareas Asistidas por IA
- Generación de componentes React
- Estructura de carpetas y arquitectura
- Configuración inicial de Vite y PWA
- Estilos con Tailwind CSS
- Documentación de funcionalidades

### Validación del Material
- Todo el código generado por IA fue **revisado y probado** por el equipo
- Se realizaron ajustes y correcciones para adaptarse a los requisitos específicos
- La funcionalidad fue validada en múltiples dispositivos
- Se implementaron mejoras sobre las sugerencias iniciales

### Enlaces a Conversaciones
- ChatGPT: https://chatgpt.com/share/6a13adfd-23c4-83e8-8ba5-719b04111102

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🧪 Testing

Para probar la aplicación funcional:

1. Visita: https://cafeteria-pwa-drab.vercel.app/
2. Explora el menú de categorías
3. Personaliza un producto
4. Añade al carrito
5. Realiza un pedido de prueba
6. Consulta el historial

## 📞 Contacto y Soporte

Para reportar problemas o hacer sugerencias, consulta con los integrantes del equipo.

---

**Desarrollado con ❤️ por el equipo de U-COFFEE** 
