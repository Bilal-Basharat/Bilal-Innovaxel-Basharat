<?php

use App\Http\Controllers\ShortenUrlController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/{short_code}',[ShortenUrlController::class, 'redirect']);