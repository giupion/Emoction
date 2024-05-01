<?php
<<<<<<< HEAD:Emoction/database/migrations/2024_04_27_154451_create_abcs_table.php
// database/migrations/..._create_abcs_table.php
=======
>>>>>>> f911cae3f2714635f22b47d5ee3ec2eb47c99552:Emoction/database/migrations/2024_05_01_143634_create_abcs_table.php
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
<<<<<<< HEAD:Emoction/database/migrations/2024_04_27_154451_create_abcs_table.php
            $table->string('Emozione');
            $table->integer('Intensita');
=======
>>>>>>> f911cae3f2714635f22b47d5ee3ec2eb47c99552:Emoction/database/migrations/2024_05_01_143634_create_abcs_table.php
            $table->string('Azione')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('abcs');
    }
}
