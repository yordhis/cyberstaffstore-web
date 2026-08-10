<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Allow explicit preview of maintenance page at any time if requested by admin
        if ($request->has('preview_maintenance')) {
            return Inertia::render('Maintenance', [
                'title' => Setting::get('maintenance_title', '🚀 Plataforma en Proceso de Construcción'),
                'message' => Setting::get('maintenance_message', 'Estamos realizando actualizaciones y optimizaciones de última generación en nuestro sitio web. ¡Muy pronto estaremos en línea!'),
                'whatsapp_number' => Setting::get('whatsapp_number', '584143534569'),
                'company_email' => Setting::get('company_email', 'contacto@cyberstaff.com'),
            ])->toResponse($request);
        }

        $isMaintenance = Setting::get('maintenance_mode', '0') === '1';

        if ($isMaintenance) {
            // Allow admin authentication & admin CMS routes at all times
            if ($request->is('admin*') || $request->is('admin/*')) {
                return $next($request);
            }

            // If user is authenticated as Admin, allow viewing the site with a notice banner
            if (auth()->check()) {
                Inertia::share('is_maintenance_active', true);
                return $next($request);
            }

            // Public visitors get the Cyber Staff Maintenance Page
            return Inertia::render('Maintenance', [
                'title' => Setting::get('maintenance_title', '🚀 Plataforma en Proceso de Construcción'),
                'message' => Setting::get('maintenance_message', 'Estamos realizando actualizaciones y optimizaciones de última generación en nuestro sitio web. ¡Muy pronto estaremos en línea!'),
                'whatsapp_number' => Setting::get('whatsapp_number', '584143534569'),
                'company_email' => Setting::get('company_email', 'contacto@cyberstaff.com'),
            ])->toResponse($request);
        }

        return $next($request);
    }
}
