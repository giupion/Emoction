<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emozione extends Model
{
    use HasFactory;

    protected $fillable = ['abc_id','nome', 'intensita', ];

    public function abc()
    {
        return $this->belongsTo(Abc::class);
    }
}

