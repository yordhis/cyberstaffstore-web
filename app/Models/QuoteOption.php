<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'key',
        'name',
        'description',
        'base_price',
        'icon',
        'is_active',
        'order',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
