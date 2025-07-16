<?php

namespace App\Models;

use App\Services\ShortCodeService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortUrl extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'short_code',
        'access_count'
    ];

    protected $casts = [
        'access_count' => 'integer'
    ];

    protected static function booted(){
        static::creating(function($model){
            if(empty($model->short_code)){
                $model->short_code = app(ShortCodeService::class)->generateUniqueCode();
            }
        });
    }

}
