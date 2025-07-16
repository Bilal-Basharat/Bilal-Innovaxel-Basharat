<?php

use App\Http\Controllers\ShortenUrlController;
use Illuminate\Support\Facades\Route;

Route::prefix('app')->get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/{short_code}',[ShortenUrlController::class, 'redirect'])
->where('short_code', '^[a-zA-Z0-9]{6}$');