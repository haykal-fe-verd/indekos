<?php

namespace Database\Seeders;

use App\Models\FotoKamar;
use App\Models\Kamar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KamarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            $kamar =  Kamar::create([
                'kategori_id' => fake()->numberBetween(1, 5),
                'nama_kamar' => 'Kamar Ke ' . $i,
                'deskripsi_kamar' => fake()->sentence(100),
                'luas_kamar' => fake()->randomElement(['4x4', '3x3']),
                'lokasi_kamar' => fake()->address(),
                'harga_kamar' => fake()->randomElement([400000, 50000, 600000, 700000]),
                'jenis_sewa' => fake()->randomElement(['bulanan', 'tahunan'])
            ]);

            FotoKamar::create([
                'kamar_id' => $kamar->id,
                'foto' => '/foto/1.png'
            ]);

            FotoKamar::create([
                'kamar_id' => $kamar->id,
                'foto' => '/foto/2.jpeg'
            ]);
        }
    }
}
