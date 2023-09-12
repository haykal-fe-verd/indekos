<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Penyewa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //admin
        $admin = User::create([
            'name' => fake()->name(),
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'admin',
        ]);

        Admin::create([
            'user_id' => $admin->id,
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['P', 'L']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 40,
        ]);

        //penyewa
        $penyewa = User::create([
            'name' => fake()->name(),
            'email' => 'penyewa@penyewa.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'penyewa',
        ]);

        Penyewa::create([
            'user_id' => $penyewa->id,
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['P', 'L']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 20,
        ]);
    }
}
