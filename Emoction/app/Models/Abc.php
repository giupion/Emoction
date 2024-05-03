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
        'Azione',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function emotions()
    {
        return $this->belongsToMany(Emotion::class)->withPivot('intensity')->withTimestamps();
    }
    
    
}

