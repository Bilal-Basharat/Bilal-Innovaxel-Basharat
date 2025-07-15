<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortUrl extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'short_code',
    ];

    public function accessCounts()
    {
        return $this->hasMany(AccessCount::class);
    }

    public function getAccessCountAttribute()
    {
        return $this->accessCounts()->sum('access_count');
    }

}
