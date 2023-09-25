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
        Schema::create('tb_pembayaran', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('penyewa_id');
            $table->unsignedBigInteger('kamar_id');
            $table->string('invoice');
            $table->string('snap_token')->nullable();
            $table->string('via')->nullable();
            $table->enum('pilihan_pembayaran', ['1', '2'])->default('1')->nullable()
                ->comment('1=langsung, 2=cod');
            $table->enum('status', ['1', '2', '3', '4'])->default('1')
                ->comment('1=menunggu pembayaran, 2=sudah dibayar, 3=kadaluarsa, 4=batal');

            $table->foreign('penyewa_id')->references('id')->on('tb_penyewa')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('kamar_id')->references('id')->on('tb_kamar')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pembayaran');
    }
};
