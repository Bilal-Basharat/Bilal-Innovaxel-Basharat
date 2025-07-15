<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use Illuminate\Http\Request;

class ShortenUrlController extends Controller
{
    public function store(Request $request) {

       $validated = $request->validate([
            'url' => 'required|url'
        ]);

        $shortUrl = ShortUrl::create([
            'url' => $validated['url']
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Short url created successfully',
            'short_url' => $shortUrl->short_code
        ], 201);
    }
}
