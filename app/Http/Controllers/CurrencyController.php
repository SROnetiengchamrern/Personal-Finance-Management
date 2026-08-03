<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CurrencyController extends Controller
{
    public function index(): Response
    {
        $currencies = Currency::query()
            ->orderBy('code')
            ->get()
            ->map(function (Currency $currency) {
                $rate = (float) $currency->exchange_rate;

                return [
                    ...$currency->toArray(),
                    // Helpful preview: how much 1 USD is worth in this currency
                    'usd_example' => $rate > 0 ? round(1 * $rate, 4) : null,
                    // And how much of this currency equals 1 USD displayed as convert hint
                    'to_usd_example' => $rate > 0 ? round(1 / $rate, 6) : null,
                ];
            });

        return Inertia::render('Currencies/Index', [
            'currencies' => $currencies,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:10', 'alpha', 'unique:currencies,code'],
            'symbol' => ['required', 'string', 'max:10'],
            'name' => ['required', 'string', 'max:255'],
            'exchange_rate' => ['required', 'numeric', 'min:0.000001'],
        ]);

        Currency::create([
            ...$validated,
            'code' => strtoupper($validated['code']),
        ]);

        return back()->with('success', 'Currency added.');
    }

    public function update(Request $request, Currency $currency): RedirectResponse
    {
        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'max:10',
                'alpha',
                Rule::unique('currencies', 'code')->ignore($currency->id),
            ],
            'symbol' => ['required', 'string', 'max:10'],
            'name' => ['required', 'string', 'max:255'],
            'exchange_rate' => ['required', 'numeric', 'min:0.000001'],
        ]);

        // Keep USD base rate locked to 1
        if (strtoupper($currency->code) === 'USD') {
            $validated['code'] = 'USD';
            $validated['exchange_rate'] = 1;
        } else {
            $validated['code'] = strtoupper($validated['code']);
        }

        $currency->update($validated);

        return back()->with('success', 'Currency updated.');
    }

    public function destroy(Currency $currency): RedirectResponse
    {
        if (strtoupper($currency->code) === 'USD') {
            return back()->with('error', 'USD is the base currency and cannot be deleted.');
        }

        $currency->delete();

        return back()->with('success', 'Currency deleted.');
    }
}
