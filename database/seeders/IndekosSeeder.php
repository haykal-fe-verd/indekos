<?php

namespace Database\Seeders;

use App\Models\Indekos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndekosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Indekos::create([
            'nama' => 'Indekos',
            'deskripsi' => fake()->sentence(255),
            'instagram' => 'https://www.instagram.com/kidz.eroll',
            'whatsapp' => 'https://www.whatsapp.com/kidz.eroll'
        ]);
    }
}
