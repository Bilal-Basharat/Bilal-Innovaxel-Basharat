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
    ];

    protected static function booted(){
        static::creating(function($model){
            if(empty($model->short_code)){
                $model->short_code = app(ShortCodeService::class)->generateUniqueCode();
            }
        });

        static::created(function($model){
            $model->accessCounts()->create(['access_count' => 0]);
        });
    }
    
    public function accessCounts()
    {
        return $this->hasOne(AccessCount::class);
    }

    public function getAccessCountAttribute()
    {
        return $this->accessCounts()->sum('access_count');
    }

}
