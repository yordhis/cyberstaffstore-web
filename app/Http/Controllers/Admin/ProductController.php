<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::orderBy('order')->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'badge' => 'required|string|max:100',
            'demo_url' => 'nullable|url',
            'image_url' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

        Product::create($validated);

        return redirect()->back()->with('success', 'Producto creado exitosamente.');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'badge' => 'required|string|max:100',
            'demo_url' => 'nullable|url',
            'image_url' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

        $product->update($validated);

        return redirect()->back()->with('success', 'Producto actualizado exitosamente.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->back()->with('success', 'Producto eliminado.');
    }
}
