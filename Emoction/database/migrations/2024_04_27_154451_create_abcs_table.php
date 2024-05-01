<?php
// database/migrations/..._create_abcs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbcsTable extends Migration
{
    public function up()
    {
        Schema::create('abcs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('data_e_ora');
            $table->string('evento');
            $table->text('Pensiero')->nullable();
            $table->string('Emozione');
            $table->integer('Intensita');
            $table->string('Azione')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('abcs');
    }
}
