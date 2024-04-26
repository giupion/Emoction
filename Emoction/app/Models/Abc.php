<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ABC extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'data_e_ora',
        'evento',
        'Pensiero',
        'Emozione',
        'Intensità',
        'Azione',
    ];

    /**
     * Get the user that owns the ABC record.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
