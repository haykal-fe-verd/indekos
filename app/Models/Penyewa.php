<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penyewa extends Model
{
    use HasFactory;

    protected $table = "tb_penyewa";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];
    protected $dates = ['tanggal_lahir'];

    // relasi dengan user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // relasi dengan pembayaran
    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class);
    }
}
