<?php

use App\Http\Controllers\ShortenUrlController;
use Illuminate\Support\Facades\Route;

// Route::post('shorten', [ShortenUrlController::class, 'store']);
// Route::get('shorten/{short_code}', [ShortenUrlController::class, 'show']);
// Route::put('shorten/{short_code}', [ShortenUrlController::class, 'update']);
// Route::delete('shorten/{short_code}', [ShortenUrlController::class, 'destroy']);
Route::resource('shorten', ShortenUrlController::class)
->only(['store', 'index', 'show', 'update', 'destroy']);

Route::get('clicks', [ShortenUrlController::class, 'clickStats']);