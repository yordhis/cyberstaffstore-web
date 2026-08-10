<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Project;
use App\Models\QuoteOption;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User for CMS
        User::updateOrCreate(
            ['email' => 'admin@cyberstaff.com'],
            [
                'name' => 'Cyber Staff Admin',
                'password' => Hash::make('admin123'),
            ]
        );

        // General Settings
        Setting::set('whatsapp_number', '584143534569');
        Setting::set('company_email', 'contacto@cyberstaff.com');
        Setting::set('hero_title', 'Transformamos tus ideas tecnológicas en software de alto impacto');
        Setting::set('hero_subtitle', 'Agencia de ingeniería de software especializada en desarrollo de aplicaciones web, mobile apps y plataformas SaaS de alto rendimiento.');

        // Flagship Products (CyberStock & CyberGym)
        Product::updateOrCreate(
            ['slug' => 'cyberstock'],
            [
                'name' => 'CyberStock ERP & Inventarios',
                'tagline' => 'Gestión inteligente de stock, punto de venta y activos comerciales',
                'description' => 'Sistema SaaS integral diseñado para el control en tiempo real de inventarios multi-almacén, facturación rápida, alertas de stock mínimo y gestión de activos inmobiliarios o comerciales.',
                'badge' => '⚡ Sistema Listo para Usar',
                'demo_url' => 'https://cyberstock.demo',
                'image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                'features' => [
                    'Control de inventario multi-bodega con código de barras',
                    'Módulo de Facturación y Punto de Venta (POS)',
                    'Reportes interactivos de utilidades y kardex de productos',
                    'Gestión de activos inmobiliarios y fichas detalladas',
                    'Exportación a PDF / Excel e integraciones API'
                ],
                'is_active' => true,
                'order' => 1,
            ]
        );

        Product::updateOrCreate(
            ['slug' => 'cybergym'],
            [
                'name' => 'CyberGym Club Manager',
                'tagline' => 'Plataforma para control de gimnasios, membresías y atletas',
                'description' => 'Software en la nube especializado en automatizar el acceso a gimnasios, cobro recurrente de membresías, rutinas digitales para clientes y métricas de retención de miembros.',
                'badge' => '🔥 SaaS Deportivo',
                'demo_url' => 'https://cybergym.demo',
                'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
                'features' => [
                    'Torniquetes y control de acceso por código QR / Huella',
                    'Cobros automatizados y alertas de membresías vencidas',
                    'App web para atletas: Rutinas, progreso y reserva de clases',
                    'Dashboard analítico de flujo de caja e ingresos mensuales',
                    'Multi-sucursal y gestión de entrenadores personal'
                ],
                'is_active' => true,
                'order' => 2,
            ]
        );

        // Portfolio Projects
        Project::updateOrCreate(
            ['title' => 'CyberStaff Store & Marketplace'],
            [
                'client_name' => 'Cyber Staff Enterprise',
                'category' => 'saas',
                'summary' => 'Marketplace global de licencias de software y servicios tecnológicos.',
                'description' => 'Desarrollo de plataforma e-commerce de alto rendimiento con pasarelas de pago múltiples, entregas automatizadas de claves de licencia y panel de analítica para vendedores.',
                'image_url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                'demo_url' => 'https://cyberstaff.store',
                'tech_stack' => ['Laravel 13', 'React', 'Inertia.js', 'Stripe API', 'Tailwind CSS'],
                'metrics' => '+250k Transacciones Procesadas',
                'is_featured' => true,
                'order' => 1,
            ]
        );

        Project::updateOrCreate(
            ['title' => 'InmoTech Real Estate CRM'],
            [
                'client_name' => 'InmoTech Global',
                'category' => 'web_app',
                'summary' => 'Plataforma de gestión de propiedades de lujo y CRM para corredores.',
                'description' => 'Sistema web con recorridos virtuales 360°, filtros geográficos en mapa interactivo, cálculo de hipotecas y match automático con perfil de comprador.',
                'image_url' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
                'demo_url' => 'https://inmotech.demo',
                'tech_stack' => ['React', 'Laravel', 'PostgreSQL', 'Mapbox GL', 'Tailwind'],
                'metrics' => '$12M en Propiedades Cotizadas',
                'is_featured' => true,
                'order' => 2,
            ]
        );

        Project::updateOrCreate(
            ['title' => 'FitTrack Mobile App'],
            [
                'client_name' => 'FitTrack Inc',
                'category' => 'mobile_app',
                'summary' => 'Aplicación móvil de entrenamiento personalizado y nutrición con IA.',
                'description' => 'App nativa fluida con sincronización Apple Health / Google Fit, generación de planes alimenticios por Inteligencia Artificial y seguimiento en tiempo real.',
                'image_url' => 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
                'demo_url' => 'https://fittrack.demo',
                'tech_stack' => ['React Native', 'Node.js', 'OpenAI API', 'Firebase'],
                'metrics' => '85k Descargas Activas',
                'is_featured' => true,
                'order' => 3,
            ]
        );

        // Quote Options for Cotizador
        $quoteOptions = [
            // Project Types
            ['group' => 'project_type', 'key' => 'web_app', 'name' => 'Web App / SaaS', 'description' => 'Plataforma web interactiva con panel de usuarios y lógica de negocio avanzada.', 'base_price' => 800, 'icon' => 'Globe', 'order' => 1],
            ['group' => 'project_type', 'key' => 'mobile_app', 'name' => 'App Móvil (iOS & Android)', 'description' => 'Aplicación móvil nativa o híbrida publicada en App Store & Play Store.', 'base_price' => 1200, 'icon' => 'Smartphone', 'order' => 2],
            ['group' => 'project_type', 'key' => 'corporate_site', 'name' => 'Sitio Web Corporativo High-End', 'description' => 'Landing page ultra atractiva optimizada para conversión de clientes.', 'base_price' => 450, 'icon' => 'Layout', 'order' => 3],
            ['group' => 'project_type', 'key' => 'custom_system', 'name' => 'Sistema ERP / CRM a Medida', 'description' => 'Software empresarial personalizado para automatización de procesos internos.', 'base_price' => 1500, 'icon' => 'Database', 'order' => 4],

            // Features
            ['group' => 'feature', 'key' => 'auth_roles', 'name' => 'Autenticación & Roles de Usuario', 'description' => 'Login, registro social, control de permisos (Admin, Operador, Cliente).', 'base_price' => 150, 'icon' => 'Lock', 'order' => 1],
            ['group' => 'feature', 'key' => 'payment_gateway', 'name' => 'Pasarela de Pagos (Stripe / PayPal / Zelle)', 'description' => 'Cobros con tarjeta de crédito, suscripciones recurrentes y facturación.', 'base_price' => 250, 'icon' => 'CreditCard', 'order' => 2],
            ['group' => 'feature', 'key' => 'analytics_dashboard', 'name' => 'Dashboard Analítico & Gráficos', 'description' => 'Reportes visuales interactivos, KPIs y exportación de informes.', 'base_price' => 200, 'icon' => 'BarChart3', 'order' => 3],
            ['group' => 'feature', 'key' => 'chat_notifications', 'name' => 'Notificaciones & Chat en Tiempo Real', 'description' => 'Notificaciones Push, emails transaccionales y mensajería en vivo.', 'base_price' => 220, 'icon' => 'MessageSquare', 'order' => 4],
            ['group' => 'feature', 'key' => 'ai_integration', 'name' => 'Integración Inteligencia Artificial (OpenAI)', 'description' => 'Chatbot inteligente, automatización de tareas y procesamiento de datos.', 'base_price' => 350, 'icon' => 'Cpu', 'order' => 5],
            ['group' => 'feature', 'key' => 'admin_cms', 'name' => 'Panel de Control CMS Personalizado', 'description' => 'Gestión completa de contenidos, imágenes y usuarios del sistema.', 'base_price' => 200, 'icon' => 'Settings', 'order' => 6],

            // Design Levels
            ['group' => 'design_level', 'key' => 'standard', 'name' => 'Diseño Modern Clean Standard', 'description' => 'Interfaz minimalista, limpia, responsive y funcional.', 'base_price' => 0, 'icon' => 'Palette', 'order' => 1],
            ['group' => 'design_level', 'key' => 'cyberpunk_premium', 'name' => 'Custom Cyberpunk / Tech Premium', 'description' => 'Estética de impacto visual con glassmorphic, neón y micro-animaciones.', 'base_price' => 250, 'icon' => 'Sparkles', 'order' => 2],
            ['group' => 'design_level', 'key' => 'ultra_3d', 'name' => 'Ultra High-End 3D & Custom UX', 'description' => 'Experiencia inmersiva con elementos 3D interactivos y animaciones complejas.', 'base_price' => 500, 'icon' => 'Zap', 'order' => 3],

            // Timelines
            ['group' => 'timeline', 'key' => 'standard', 'name' => 'Estándar (3-4 Semanas)', 'description' => 'Ritmo regular de desarrollo con entregas semanales de avance.', 'base_price' => 0, 'icon' => 'Clock', 'order' => 1],
            ['group' => 'timeline', 'key' => 'fast', 'name' => 'Prioritario (2 Semanas)', 'description' => 'Asignación de equipo dedicado para acelerar el lanzamiento.', 'base_price' => 200, 'icon' => 'Flame', 'order' => 2],
            ['group' => 'timeline', 'key' => 'express', 'name' => 'Express Ultra Urgente (1 Semana)', 'description' => 'Despliegue de máxima prioridad con jornadas intensivas de ingeniería.', 'base_price' => 450, 'icon' => 'Rocket', 'order' => 3],
        ];

        foreach ($quoteOptions as $opt) {
            QuoteOption::updateOrCreate(
                ['group' => $opt['group'], 'key' => $opt['key']],
                $opt
            );
        }
    }
}
