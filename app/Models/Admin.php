<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin extends Model
{
    use HasFactory;

    protected $table = "tb_admin";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];
    protected $dates = ['tanggal_lahir'];

    // relasi dengan user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
