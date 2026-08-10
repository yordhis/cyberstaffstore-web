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
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'demo_url' => 'nullable|url',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('projects', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

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
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'demo_url' => 'nullable|url',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('projects', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

        $project->update($validated);

        return redirect()->back()->with('success', 'Proyecto actualizado.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->back()->with('success', 'Proyecto eliminado del portafolio.');
    }
}
