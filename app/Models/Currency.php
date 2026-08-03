<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = [
        'code',
        'symbol',
        'name',
        'exchange_rate',
    ];

    protected function casts(): array
    {
        return [
            'exchange_rate' => 'decimal:6',
        ];
    }
}
