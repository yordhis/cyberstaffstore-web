<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_email')->nullable();
            $table->string('client_phone')->nullable();
            $table->string('company_name')->nullable();
            $table->string('project_type');
            $table->json('selected_features')->nullable();
            $table->string('design_level');
            $table->string('urgency');
            $table->decimal('estimated_budget', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->string('status')->default('pending'); // pending, contacted, closed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
