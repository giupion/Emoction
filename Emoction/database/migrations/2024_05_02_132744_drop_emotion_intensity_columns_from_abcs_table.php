<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropEmotionIntensityColumnsFromAbcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('abcs', function (Blueprint $table) {
            $table->dropColumn('Emozione');
            $table->dropColumn('Intensita');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('abcs', function (Blueprint $table) {
            $table->string('Emozione');
            $table->integer('Intensita');
        });
    }
}
