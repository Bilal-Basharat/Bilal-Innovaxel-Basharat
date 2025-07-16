<?php

namespace App\Services;

use App\Models\ShortUrl;
use Illuminate\Support\Str;

Class ShortCodeService
{
    public function generateUniqueCode(int $length = 6): string
    {

        $code = $this->generateRandomCode(6);

        while($this->codeExists($code)){
            $code = $this->generateRandomCode(6);
        }
        return $code;
    }

    protected function generateRandomCode(int $length): string
    {
        return Str::random($length);
    }

    protected function codeExists(string $code): bool
    {
        return ShortUrl::where('short_code', $code)->exists();
    }
}