<p align="center">
  <img src="public/images/logo_sin_fondo.png" width="220" alt="Cyber Staff Logo">
</p>

<h1 align="center">CYBER STAFF — Tech Laboratory & Software Agency</h1>

<p align="center">
  <strong>Plataforma Web Oficial, Generador de Cotizaciones WhatsApp y Panel CMS de Administración</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/Inertia.js-Modern_Monolith-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

---

## 📌 Descripción General del Proyecto

**Cyber Staff** es una plataforma web integral construida para proyectar una imagen tecnológica de vanguardia ("Tech Laboratory & Software Engineering Agency"). Diseñada con una estética ciberespacial futurista, glassmorphism y efectos neón, la plataforma combina marketing tecnológico, exhibición de productos SaaS insignias, cotizador automatizado y un panel de administración CMS totalmente adaptable.

### 🌟 Módulos y Funcionalidades Clave

1. **Exhibición de Productos Flagship (Demos Interactivas)**:
   - Presentación destacada de **CyberStock ERP** (Gestión de Inventario & Punto de Venta) y **CyberGym Manager** (Gestión de Clubes y Gimnasios) con enlaces directos a sus entornos de demostración.

2. **Cotizador Automatizado multicapa (WhatsApp Lead Generator)**:
   - Estimador interactivo en tiempo real donde el cliente selecciona el tipo de proyecto, módulos requeridos, nivel de diseño y urgencia.
   - Registra el Lead automáticamente en la base de datos MySQL antes de redirigir al cliente a WhatsApp con un resumen profesional pre-formateado.

3. **Panel de Administración CMS (`/admin`)**:
   - Gestión integral de Productos SaaS, Portafolio de Proyectos, Opciones y Tarifas del Cotizador, Oportunidades/Leads recibidos y Configuración Global del Sitio.

4. **Modo Mantenimiento Inteligente con Control CMS**:
   - Interruptor en el CMS para ocultar el sitio a los visitantes mostrando una pantalla neón de mantenimiento con botón de WhatsApp directo.
   - Permite a los administradores autenticados seguir navegando y previsualizando el sitio web con una barra superior de notificación.

---

## 🛠️ Informe Técnico & Arquitectura

La aplicación adopta el patrón de **Monolito Moderno** utilizando **Laravel 13** en el backend e **Inertia.js + React 18** en el frontend, garantizando máxima velocidad de desarrollo, SPA sin API externa costosa y SEO optimizado.

### 🏗️ Tecnologías del Stack

- **Framework Backend**: Laravel 13.x (PHP 8.3+)
- **Adaptador SPA**: Inertia.js (Renderizado reactivo sin recarga de página)
- **Framework Frontend**: React 18
- **Estilos & Diseño**: Tailwind CSS con paleta personalizada Cyber Staff (`#021a1e`, `#072a30`, `#00e699`, `#00bfff`)
- **Iconografía**: Lucide React Icons
- **Base de Datos**: MySQL / MariaDB
- **Empaquetador de Assets**: Vite 5.x

### 📁 Estructura del Código Fuente

```text
cyberstaffstore/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # Controladores del Panel CMS
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── LeadController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── ProjectController.php
│   │   │   │   ├── QuoteOptionController.php
│   │   │   │   └── SettingController.php
│   │   │   ├── HomeController.php   # Controlador de Landing Pública
│   │   │   └── LeadController.php   # Registro de Oportunidades
│   │   └── Middleware/
│   │       ├── CheckMaintenanceMode.php # Interceptor de Modo Mantenimiento
│   │       └── HandleInertiaRequests.php
│   └── Models/                      # Modelos Eloquent (Product, Project, Lead, Setting, QuoteOption)
├── database/
│   ├── migrations/                 # Esquema relacional de tablas
│   └── seeders/                    # Carga inicial de CyberStock, CyberGym y precios
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Public/             # Secciones Landing (Hero, Services, Portfolio, Cotizador)
│   │   │   └── UI/                 # Componentes de UI (Navbar, Footer, Buttons)
│   │   ├── Layouts/
│   │   │   ├── AdminLayout.jsx     # Layout del CMS
│   │   │   └── PublicLayout.jsx    # Layout Público con aviso de mantenimiento
│   │   └── Pages/
│   │       ├── Admin/              # Vistas CMS React
│   │       ├── Home.jsx            # Landing Page Principal
│   │       └── Maintenance.jsx     # Pantalla Pública de Mantenimiento
└── routes/
    └── web.php                     # Definición de rutas públicas y del CMS
```

---

## 🚀 Guía e Informe de Despliegue

### ⚙️ Requisitos del Servidor

- **PHP**: >= 8.2 (Extensiones: `pdo`, `mbstring`, `openssl`, `tokenizer`, `xml`, `cURL`)
- **Composer**: >= 2.x
- **Node.js**: >= 18.x & NPM >= 9.x
- **Base de Datos**: MySQL 8.0+ / MariaDB 10.4+
- **Servidor Web**: Nginx / Apache / Laragon

---

### 💻 Instalación Local Paso a Paso

1. **Clonar el repositorio y entrar al directorio**:
   ```bash
   git clone https://github.com/yordhis/cyberstaffstore.git
   cd cyberstaffstore
   ```

2. **Instalar dependencias de PHP y Node**:
   ```bash
   composer install
   npm install
   ```

3. **Configurar el archivo de entorno (`.env`)**:
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de configurar los datos de la base de datos:
   ```env
   APP_NAME="Cyber Staff"
   APP_ENV=local
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cyberstaffstore
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. **Generar la clave de la aplicación**:
   ```bash
   php artisan key:generate
   ```

5. **Ejecutar migraciones y datos iniciales (Seeders)**:
   ```bash
   php artisan migrate --seed
   ```

6. **Crear el enlace simbólico de almacenamiento público**:
   ```bash
   php artisan storage:link
   ```

7. **Iniciar los servidores de desarrollo**:
   - Servidor backend Laravel:
     ```bash
     php artisan serve
     ```
   - Compilador de assets Vite:
     ```bash
     npm run dev
     ```

---

### 🌐 Despliegue en Servidor de Producción (VPS / Laragon / Hostinger / CPanel)

1. **Compilar los assets de producción**:
   ```bash
   npm run build
   ```

2. **Optimizar caché de Laravel**:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Configuración de Apache (`.htaccess`) o Nginx**:
   Apuntar la raíz del dominio (`DocumentRoot`) a la carpeta `public/` del proyecto.

---

## 🔑 Acceso al CMS de Administración

El panel CMS está protegido y desvinculado de botones visibles en el frontend público por privacidad.

- 🌐 **Ruta Directa del CMS**:
  [`/admin/login`](http://localhost:8000/admin/login)

- 📌 **Enlace Local**:
  - `http://localhost:8000/admin/login` (o `http://cyberstaffstore.test/admin/login` en Laragon)

- 🔒 **Gestión de Configuración**:
  Desde el CMS en `/admin/settings` se pueden modificar el número de WhatsApp receptor, correo de contacto, títulos principales y **Activar/Desactivar el Modo Mantenimiento**.

---

<p align="center">
  Developed with ❤️ by <strong>Cyber Staff Engine</strong> © 2026. Todos los derechos reservados.
</p>
