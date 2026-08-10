<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Project;
use App\Models\QuoteOption;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('is_active', true)->orderBy('order')->get();
        $projects = Project::where('is_featured', true)->orderBy('order')->get();
        $quoteOptions = QuoteOption::where('is_active', true)->orderBy('order')->get()->groupBy('group');

        $settings = [
            'whatsapp_number' => Setting::get('whatsapp_number', '584143534569'),
            'company_email' => Setting::get('company_email', 'contacto@cyberstaff.com'),
            'hero_title' => Setting::get('hero_title', 'Transformamos tus ideas tecnológicas en software de alto impacto'),
            'hero_subtitle' => Setting::get('hero_subtitle', 'Agencia de ingeniería de software especializada en aplicaciones web, mobile apps y plataformas SaaS.'),
        ];

        return Inertia::render('Home', [
            'products' => $products,
            'projects' => $projects,
            'quoteOptions' => $quoteOptions,
            'settings' => $settings,
        ]);
    }
}
