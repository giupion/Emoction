<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmozioniTable extends Migration
{
    public function up()
    {
        Schema::create('emozioni', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('abc_id');
            $table->foreign('abc_id')->references('id')->on('abcs')->onDelete('cascade');
            $table->string('nome');
            $table->integer('intensita');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('emozioni');
    }
}
