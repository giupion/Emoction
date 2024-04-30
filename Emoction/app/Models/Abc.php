<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abc extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'data_e_ora',
        'evento',
        'Pensiero',
        'Emozioni',
        'Intensita',
        'Azione',
        'nome', // Aggiunto campo 'nome'
        'intensita', // Aggiunto campo 'intensita'
    ];

    protected $casts = [
        'Emozioni' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
