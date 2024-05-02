<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNomeAndChangeIntensityToAbcEmotionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('abc_emotion', function (Blueprint $table) {
            // Aggiungi il campo "nome" prima del campo "intensity"
            $table->string('nome')->after('id');

            // Rinomina il campo "intensity" in "intensita"
            $table->renameColumn('intensity', 'intensita');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('abc_emotion', function (Blueprint $table) {
            // Rinomina il campo "intensita" in "intensity"
            $table->renameColumn('intensita', 'intensity');

            // Rimuovi il campo "nome"
            $table->dropColumn('nome');
        });
    }
}
