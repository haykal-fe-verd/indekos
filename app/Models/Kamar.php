<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kamar extends Model
{
    use HasFactory;

    protected $table = "tb_kamar";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    // relasi dengan kategori
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class);
    }

    // relasi dengan foto kamar
    public function foto_kamar(): HasMany
    {
        return $this->hasMany(FotoKamar::class);
    }

    // relasi dengan fasilitas kamar
    public function fasilitas_kamar(): HasMany
    {
        return $this->hasMany(FasilitasKamar::class);
    }
}
