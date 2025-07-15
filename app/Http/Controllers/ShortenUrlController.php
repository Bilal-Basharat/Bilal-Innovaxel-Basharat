<?php

namespace App\Http\Controllers;

use App\Models\AccessCount;
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
                'short_url' => config('app.short_url_domain'). '/'.$shortUrl->short_code
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

            if(empty($url)){
                return response()->json([
                    'success' => false,
                    'message' => 'Short url not found',
                ], 404);
            }

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

    public function update(Request $request, $short_code)
    {
        try {
            $validated = $request->validate([
                'url' => 'required|url'
            ]);

            $updateUrl = ShortUrl::where('short_code', $short_code);
            
            if(empty($updateUrl)){
                return response()->json([
                    'success' => false,
                    'message' => 'Short url not found',
                ], 404);
            }

            $updateUrl->update([
                'url' => $validated['url']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Short url updated successfully',
                'short_url' => config('app.short_url_domain'). '/'.$short_code
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Short url not found',
                'error' => $exception->getMessage(),
            ], 404);
        }
    }

    public function destroy($short_code)
    {
        try {
            $url =ShortUrl::where('short_code', $short_code);

            if(empty($url)){
                return response()->json([
                    'success' => false,
                    'message' => 'Short url not found',
                ], 404);
            }

            $url->delete();

            return response()->json([
                'success' => true,
                'message' => 'Short url deleted successfully',
            ], 204);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Short url not found',
                'error' => $exception->getMessage(),
            ], 404);
        }
    }

    public function redirect($short_code)
    {
        try{
            $url = ShortUrl::where('short_code', $short_code)->first();

            if(empty($url)){
                return response()->json([
                    'success' => false,
                    'message' => 'Short url not found',
                ], 404);
            }

            AccessCount::where('short_url_id', $url->id)->increment('access_count');

            return redirect()->away($url->url);
        }
        catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'error' => $exception->getMessage(),
            ], 404);
        }
    }
}
