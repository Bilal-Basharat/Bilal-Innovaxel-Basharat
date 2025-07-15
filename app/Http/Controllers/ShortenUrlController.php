<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use Exception;
use Illuminate\Http\Request;

class ShortenUrlController extends Controller
{
    public function store(Request $request)
    {
        try {

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

        } catch (Exception $ex) {

            return response()->json([
                'success' => false,
                'message' => 'Failed to create short URL',
                'error' => $ex->getMessage(),
            ], 400);
        }
    }

    public function show($short_code)
    {
        try {
            $validated = validator(['short_code' => $short_code], [
                'short_code' => 'required|exists:short_urls,short_code'
            ])->validate();

            $url = ShortUrl::where('short_code', $validated['short_code'])->first()->value('url');

            return response()->json([
                'success' => true,
                'message' => 'Url found successfully',
                'url' => $url
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Short url not found',
                'error' => $exception->getMessage(),
            ], 404);
        }
    }
}
