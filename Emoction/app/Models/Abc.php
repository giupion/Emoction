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
        'Emozione',
        'Intensita',
        'Azione',
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
