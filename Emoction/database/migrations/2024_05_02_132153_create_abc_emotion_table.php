<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('abc_emotion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('abc_id')->constrained()->onDelete('cascade');
            $table->foreignId('emotion_id')->constrained()->onDelete('cascade');
            $table->integer('intensity');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abc_emotion');
    }
};
