<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyAbcEmotionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('abc_emotion', function (Blueprint $table) {
            // Rinomina il campo "intensita" in "intensity"
            $table->renameColumn('intensita', 'intensity');

            // Rimuovi il campo "nome" dalla tabella
            $table->dropColumn('nome');
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
            // Se vuoi poter tornare indietro, puoi aggiungere di nuovo il campo "nome" e rinominare "intensity" in "intensita" utilizzando il seguente codice
            // $table->string('nome');
            // $table->renameColumn('intensity', 'intensita');
        });
    }
}
