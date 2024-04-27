<?php
// database/migrations/..._create_abcs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbcsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('abcs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->datetime('data_e_ora');
            $table->string('evento');
            $table->text('Pensiero')->nullable();
            $table->string('Emozione');
            $table->integer('Intensita');
            $table->text('Azione')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abcs');
    }
}
