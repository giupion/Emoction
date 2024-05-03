<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'intensita'
        // altre proprietà se necessario
    ];

    public function abcs()
    {
        return $this->belongsToMany(Abc::class)
                    ->withPivot('intensity')
                    ->withTimestamps();
    }
}
