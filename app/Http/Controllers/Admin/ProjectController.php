<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::orderBy('order')->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'category' => 'required|string',
            'summary' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'demo_url' => 'nullable|url',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        Project::create($validated);

        return redirect()->back()->with('success', 'Proyecto agregado al portafolio.');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'category' => 'required|string',
            'summary' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'demo_url' => 'nullable|url',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Proyecto actualizado.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->back()->with('success', 'Proyecto eliminado del portafolio.');
    }
}
