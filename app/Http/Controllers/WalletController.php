<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    public function index(Request $request): Response
    {
        $wallets = $request->user()
            ->wallets()
            ->latest()
            ->get();

        return Inertia::render('Wallets/Index', [
            'wallets' => $wallets,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Wallets/Create', [
            'currencies' => $this->currencies(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['Cash', 'Bank', 'Credit Card', 'E-Wallet'])],
            'balance' => ['nullable', 'numeric'],
            'currency' => ['required', 'string', 'max:10', Rule::exists('currencies', 'code')],
            'color' => ['nullable', 'string', 'max:30'],
            'icon' => ['nullable', 'string', 'max:50'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
        ]);

        $request->user()->wallets()->create([
            ...$validated,
            'balance' => $validated['balance'] ?? 0,
            'status' => $validated['status'] ?? 'active',
            'color' => $validated['color'] ?? '#0f766e',
            'currency' => strtoupper($validated['currency']),
        ]);

        return redirect()->route('wallets.index')->with('success', 'Wallet created.');
    }

    public function edit(Request $request, Wallet $wallet): Response
    {
        $this->authorizeWallet($request, $wallet);

        return Inertia::render('Wallets/Edit', [
            'wallet' => $wallet,
            'currencies' => $this->currencies(),
        ]);
    }

    public function update(Request $request, Wallet $wallet): RedirectResponse
    {
        $this->authorizeWallet($request, $wallet);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['Cash', 'Bank', 'Credit Card', 'E-Wallet'])],
            'balance' => ['nullable', 'numeric'],
            'currency' => ['required', 'string', 'max:10', Rule::exists('currencies', 'code')],
            'color' => ['nullable', 'string', 'max:30'],
            'icon' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);

        $wallet->update([
            ...$validated,
            'currency' => strtoupper($validated['currency']),
        ]);

        return redirect()->route('wallets.index')->with('success', 'Wallet updated.');
    }

    public function destroy(Request $request, Wallet $wallet): RedirectResponse
    {
        $this->authorizeWallet($request, $wallet);
        $wallet->delete();

        return redirect()->route('wallets.index')->with('success', 'Wallet deleted.');
    }

    private function currencies()
    {
        return Currency::query()
            ->orderBy('code')
            ->get(['id', 'code', 'symbol', 'name']);
    }

    private function authorizeWallet(Request $request, Wallet $wallet): void
    {
        abort_unless($wallet->user_id === $request->user()->id, 403);
    }
}
