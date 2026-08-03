<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\Wallet;
use App\Services\CurrencyConverter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TransferController extends Controller
{
    public function index(Request $request): Response
    {
        $transfers = $request->user()
            ->transfers()
            ->with([
                'fromWallet:id,name,color,currency',
                'toWallet:id,name,color,currency',
            ])
            ->latest('transfer_date')
            ->latest('id')
            ->paginate(15);

        return Inertia::render('Transfers/Index', [
            'transfers' => $transfers,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Transfers/Create', [
            'wallets' => $request->user()
                ->wallets()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name', 'balance', 'currency', 'color']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'from_wallet_id' => ['required', 'exists:wallets,id', 'different:to_wallet_id'],
            'to_wallet_id' => ['required', 'exists:wallets,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'note' => ['nullable', 'string', 'max:1000'],
            'transfer_date' => ['required', 'date'],
        ]);

        $userId = $request->user()->id;

        $fromWallet = Wallet::where('id', $validated['from_wallet_id'])->where('user_id', $userId)->firstOrFail();
        $toWallet = Wallet::where('id', $validated['to_wallet_id'])->where('user_id', $userId)->firstOrFail();

        $amount = (float) $validated['amount'];

        if ($fromWallet->balance < $amount) {
            return back()->withErrors([
                'amount' => 'Insufficient balance in the selected From wallet.',
            ])->withInput();
        }

        $converter = app(CurrencyConverter::class);
        $creditAmount = $converter->convert(
            $amount,
            $fromWallet->currency ?: 'USD',
            $toWallet->currency ?: 'USD'
        );

        DB::transaction(function () use ($request, $validated, $fromWallet, $toWallet, $amount, $creditAmount) {
            $request->user()->transfers()->create($validated);

            $fromWallet->decrement('balance', $amount);
            $toWallet->increment('balance', round($creditAmount, 2));
        });

        $message = strtoupper($fromWallet->currency) === strtoupper($toWallet->currency)
            ? 'Transfer completed.'
            : sprintf(
                'Transfer completed: %s → %s (converted).',
                number_format($amount, 2).' '.$fromWallet->currency,
                number_format($creditAmount, 2).' '.$toWallet->currency
            );

        return redirect()->route('transfers.index')->with('success', $message);
    }

    public function destroy(Request $request, Transfer $transfer): RedirectResponse
    {
        abort_unless($transfer->user_id === $request->user()->id, 403);

        $fromWallet = Wallet::findOrFail($transfer->from_wallet_id);
        $toWallet = Wallet::findOrFail($transfer->to_wallet_id);
        $converter = app(CurrencyConverter::class);

        $creditAmount = $converter->convert(
            (float) $transfer->amount,
            $fromWallet->currency ?: 'USD',
            $toWallet->currency ?: 'USD'
        );

        DB::transaction(function () use ($transfer, $fromWallet, $toWallet, $creditAmount) {
            $fromWallet->increment('balance', $transfer->amount);
            $toWallet->decrement('balance', round($creditAmount, 2));
            $transfer->delete();
        });

        return redirect()->route('transfers.index')->with('success', 'Transfer reversed.');
    }
}
