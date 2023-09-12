<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{
    use HasFactory;

    protected $table = "tb_kategori";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    // relasi dengan kamar
    public function kamar(): HasMany
    {
        return $this->hasMany(Kamar::class);
    }
}
