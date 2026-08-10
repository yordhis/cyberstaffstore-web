<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_products' => Product::count(),
            'total_projects' => Project::count(),
            'total_leads' => Lead::count(),
            'pending_leads' => Lead::where('status', 'pending')->count(),
        ];

        $recentLeads = Lead::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentLeads' => $recentLeads,
        ]);
    }
}
