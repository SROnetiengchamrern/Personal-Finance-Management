<?php

namespace App\Services;

use App\Models\Currency;
use Illuminate\Support\Collection;

class CurrencyConverter
{
    /** @var Collection<string, float> code => units per 1 USD */
    private Collection $rates;

    public function __construct(?Collection $rates = null)
    {
        $this->rates = $rates ?? Currency::query()
            ->pluck('exchange_rate', 'code')
            ->map(fn ($rate) => (float) $rate);
    }

    /**
     * Convert an amount into USD.
     * exchange_rate is stored as: how many units of that currency = 1 USD
     * e.g. KHR 4100 means 4100៛ = $1, so 3,200,000 KHR => 3200000 / 4100 USD
     */
    public function toUsd(float $amount, string $fromCurrency): float
    {
        $from = strtoupper($fromCurrency);
        $rate = (float) ($this->rates[$from] ?? 1);

        if ($rate <= 0) {
            $rate = 1;
        }

        return $amount / $rate;
    }

    /**
     * Convert an amount from USD into a target currency.
     */
    public function fromUsd(float $amountUsd, string $toCurrency): float
    {
        $to = strtoupper($toCurrency);
        $rate = (float) ($this->rates[$to] ?? 1);

        if ($rate <= 0) {
            $rate = 1;
        }

        return $amountUsd * $rate;
    }

    /**
     * Convert between any two currencies via USD.
     */
    public function convert(float $amount, string $fromCurrency, string $toCurrency): float
    {
        if (strtoupper($fromCurrency) === strtoupper($toCurrency)) {
            return $amount;
        }

        return $this->fromUsd(
            $this->toUsd($amount, $fromCurrency),
            $toCurrency
        );
    }
}
