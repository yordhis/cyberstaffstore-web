<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'client_email',
        'client_phone',
        'company_name',
        'project_type',
        'selected_features',
        'design_level',
        'urgency',
        'estimated_budget',
        'notes',
        'status',
    ];

    protected $casts = [
        'selected_features' => 'array',
        'estimated_budget' => 'decimal:2',
    ];
}
