<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $settings = [
            'whatsapp_number' => Setting::get('whatsapp_number', '584143534569'),
            'company_email' => Setting::get('company_email', 'contacto@cyberstaff.com'),
            'hero_title' => Setting::get('hero_title', 'Transformamos tus ideas tecnológicas en software de alto impacto'),
            'hero_subtitle' => Setting::get('hero_subtitle', 'Agencia de ingeniería de software especializada en aplicaciones web, mobile apps y plataformas SaaS.'),
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'whatsapp_number' => 'required|string|max:50',
            'company_email' => 'required|email|max:255',
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'required|string|max:1000',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return redirect()->back()->with('success', 'Configuración general actualizada exitosamente.');
    }
}
