# Cyber Staff - Guía de Patrón de Diseño & Reglas del Proyecto (AGENTS.md)

Este documento define el sistema de diseño visual, la arquitectura de componentes y las convenciones de código para la plataforma de **Cyber Staff** (Sitio Web + Cotizador WhatsApp + CMS) construida con **Laravel + React (Inertia.js)**.

---

## 🎨 1. Sistema de Diseño Visual (Cyber Staff Aesthetics)

El sitio de Cyber Staff debe proyectar una imagen tecnológica de vanguardia, moderna, vibrante y confiable ("Tech Laboratory & Software Engineering Agency").

### Paleta de Colores (Tokens)
- **Fondo Base Primario**: `#021a1e` (Teal Oscuro Profundo / Ciberespacio)
- **Fondo de Contenedores / Cards**: `#072a30` con `backdrop-filter: blur(12px)` (Glassmorphism)
- **Acento Principal (Verde Cyber Staff)**: `#00e699` / `#10b981` (Verde Esmeralda Neón Vibrante)
- **Acento Secundario (Azul Ciber)**: `#00bfff` / `#3b82f6` (Azul Neón de Enfoque)
- **Texto Principal**: `#ffffff` (Blanco Puro)
- **Texto Secundario**: `#94a3b8` / `#cbd5e1` (Gris Azulado de Alta Readabilidad)
- **Bordes y Brillos**: `rgba(0, 230, 153, 0.2)` con efectos de resplandor `box-shadow: 0 0 20px rgba(0, 230, 153, 0.25)`

### Tipografía y Jerarquía
- **Títulos (`h1`, `h2`, `h3`)**: Sans-serif moderna de peso 700/800 con tracking ajustado. Aplicar gradientes de texto neón: `bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent`.
- **Cuerpo (`p`, `span`)**: Inter / Outfit con interlineado holgado `leading-relaxed`.

### Micro-Animaciones & Efectos Interactivos
- **Tarjetas de Servicios y Portafolio**: Transición suave al pasar el cursor (`hover:-translate-y-2 transition-all duration-300 shadow-emerald-500/20 hover:border-emerald-400/50`).
- **Botones CTA**: Gradiente activo con resplandor neón `shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50`.
- **Badges y Etiquetas**: Formato cápsula pill con fondo translúcido y borde brillante.

---

## 🧩 2. Patrones de Arquitectura Frontend (React + Inertia)

### Estructura de Componentes
1. **Atómicos / UI Base** (`resources/js/Components/UI`):
   - `Button.jsx`: Botón primario neón, secundario delineado, y de acción especial (WhatsApp).
   - `Badge.jsx`: Etiquetas tecnológicas (React, Laravel, CyberStock, CyberGym).
   - `Card.jsx`: Tarjeta base glassmorphism con borde fluorescente sutil.
   - `Input.jsx` / `Select.jsx`: Inputs estilizados para el CMS y el Cotizador.
2. **Secciones de la Landing Page** (`resources/js/Components/Public`):
   - `HeroFlagship.jsx`: Presentación de CyberStock y CyberGym con links a Demos.
   - `ServicesGrid.jsx`: Lista interactiva de servicios de desarrollo.
   - `PortfolioGrid.jsx`: Proyectos realizados con modal interactivo.
   - `CotizadorWizard.jsx`: Cotizador multicapa con estimador dinámico y disparador de WhatsApp.
3. **Páginas Inertia** (`resources/js/Pages`):
   - `Home.jsx`: Ensamblado de secciones públicas.
   - `Admin/*.jsx`: Vistas del CMS de administración.

---

## 💻 3. Patrones Backend (Laravel 13 Monolito)

- **Controladores del Sitio**:
  - `HomeController.php`: Renderiza `Inertia::render('Home', [...])` pasando productos, portafolio y opciones de cotización desde la BD.
  - `LeadController.php`: Procesa y registra en BD las cotizaciones que los clientes generan antes de redirigir a WhatsApp.
- **Controladores del CMS (`Admin\*`)**:
  - CRUDs estructurados con validaciones en FormRequests.
  - Manejo de carga de archivos (imágenes de proyectos y productos) en `storage/app/public`.
- **Estructura de la Base de Datos**:
  - Mantener tablas relacionales con seeders iniciales precargados con los datos de CyberStock, CyberGym y precios base del Cotizador.

---

## 📲 4. Patrón de Integración WhatsApp (Cotizador)

- La cotización se calcula dinámicamente en el estado de React.
- Al hacer clic en "Enviar a WhatsApp":
  1. Se envía vía AJAX a Laravel `/api/quote/lead` para registrar la oportunidad en el CMS.
  2. Se construye la URL encodeada `https://wa.me/{WHATSAPP_NUMBER}?text={ENCODED_MESSAGE}`.
  3. Formato del mensaje de WhatsApp:
     ```text
     👋 *¡Hola Cyber Staff! Quiero cotizar mi proyecto.*
     
     📌 *Tipo de Proyecto:* Web App / App Móvil
     ⚡ *Funcionalidades:* Login, Pasarela de Pagos, Dashboard, Chat
     🎨 *Nivel de Diseño:* Custom Cyberpunk Premium
     ⏱️ *Urgencia:* Estándar (3-4 semanas)
     
     💰 *Estimación Aproximada:* $XXXX USD
     
     👤 *Mis Datos:*
     - Nombre: [Nombre]
     - Empresa: [Empresa]
     - Comentario: [Breve idea]
     ```
  4. Se abre en una ventana nueva (`window.open(whatsappUrl, '_blank')`).
