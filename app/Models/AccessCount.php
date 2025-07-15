<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessCount extends Model
{
    protected $table = 'access_counts';

     protected $fillable = [
        'access_count',  
        'short_url_id'
    ];

    protected $casts = [
        'access_count' => 'integer'
    ];

    public function shortUrl()
    {
        return $this->belongsTo(ShortUrl::class);
    }
}
