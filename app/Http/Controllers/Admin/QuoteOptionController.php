<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuoteOption;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteOptionController extends Controller
{
    public function index(): Response
    {
        $options = QuoteOption::orderBy('group')->orderBy('order')->get();

        return Inertia::render('Admin/QuoteOptions/Index', [
            'options' => $options,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'group' => 'required|string',
            'key' => 'required|string',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        QuoteOption::create($validated);

        return redirect()->back()->with('success', 'Opción de cotizador creada.');
    }

    public function update(Request $request, QuoteOption $quoteOption): RedirectResponse
    {
        $validated = $request->validate([
            'group' => 'required|string',
            'key' => 'required|string',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $quoteOption->update($validated);

        return redirect()->back()->with('success', 'Opción de cotizador actualizada.');
    }

    public function destroy(QuoteOption $quoteOption): RedirectResponse
    {
        $quoteOption->delete();

        return redirect()->back()->with('success', 'Opción eliminada.');
    }
}
