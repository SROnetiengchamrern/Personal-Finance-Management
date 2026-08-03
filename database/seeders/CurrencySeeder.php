<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    public function run(): void
    {
        $currencies = [
            ['code' => 'USD', 'symbol' => '$', 'name' => 'US Dollar', 'exchange_rate' => 1],
            ['code' => 'EUR', 'symbol' => '€', 'name' => 'Euro', 'exchange_rate' => 0.92],
            ['code' => 'KHR', 'symbol' => '៛', 'name' => 'Cambodian Riel', 'exchange_rate' => 4100],
            ['code' => 'THB', 'symbol' => '฿', 'name' => 'Thai Baht', 'exchange_rate' => 35.5],
            ['code' => 'GBP', 'symbol' => '£', 'name' => 'British Pound', 'exchange_rate' => 0.79],
        ];

        foreach ($currencies as $currency) {
            Currency::updateOrCreate(['code' => $currency['code']], $currency);
        }
    }
}
