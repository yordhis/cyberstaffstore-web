<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_email' => 'nullable|email|max:255',
            'client_phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:255',
            'project_type' => 'required|string',
            'selected_features' => 'nullable|array',
            'design_level' => 'required|string',
            'urgency' => 'required|string',
            'estimated_budget' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $lead = Lead::create($validated);

        // Build WhatsApp URL
        $whatsappNumber = Setting::get('whatsapp_number', '584143534569');
        $featuresList = !empty($validated['selected_features'])
            ? implode(', ', $validated['selected_features'])
            : 'Estándar';

        $companyText = !empty($validated['company_name']) ? " ({$validated['company_name']})" : "";

        $message = "👋 *¡Hola Cyber Staff! Quiero cotizar mi proyecto.* \n\n"
            . "📌 *Tipo de Proyecto:* {$validated['project_type']}\n"
            . "⚡ *Funcionalidades:* {$featuresList}\n"
            . "🎨 *Nivel de Diseño:* {$validated['design_level']}\n"
            . "⏱️ *Urgencia / Plazo:* {$validated['urgency']}\n\n"
            . "💰 *Estimación Aproximada:* $" . number_format($validated['estimated_budget'], 2) . " USD\n\n"
            . "👤 *Mis Datos:*\n"
            . "- Nombre: {$validated['client_name']}{$companyText}\n"
            . "- Teléfono: " . ($validated['client_phone'] ?? 'No especificado') . "\n"
            . "- Email: " . ($validated['client_email'] ?? 'No especificado') . "\n"
            . "- Idea / Comentario: " . ($validated['notes'] ?? 'Sin comentarios adicionales');

        $encodedMessage = rawurlencode($message);
        $whatsappUrl = "https://wa.me/{$whatsappNumber}?text={$encodedMessage}";

        return response()->json([
            'success' => true,
            'lead_id' => $lead->id,
            'whatsapp_url' => $whatsappUrl,
        ]);
    }
}
