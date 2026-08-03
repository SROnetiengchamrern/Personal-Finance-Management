<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\SavingsGoal;
use App\Models\Transaction;
use App\Services\CurrencyConverter;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $now = Carbon::now();
        $displayCurrency = strtoupper($user->currency ?? 'USD');
        $converter = app(CurrencyConverter::class);

        $wallets = $user->wallets()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'type', 'balance', 'currency', 'color', 'icon']);

        // Convert every wallet into the user's display currency, then sum
        $totalBalance = $wallets->sum(function ($wallet) use ($converter, $displayCurrency) {
            return $converter->convert(
                (float) $wallet->balance,
                $wallet->currency ?: 'USD',
                $displayCurrency
            );
        });

        $monthTransactions = $user->transactions()
            ->with('wallet:id,currency')
            ->whereMonth('transaction_date', $now->month)
            ->whereYear('transaction_date', $now->year)
            ->get(['id', 'wallet_id', 'type', 'amount']);

        $monthIncome = $monthTransactions
            ->where('type', 'income')
            ->sum(function (Transaction $tx) use ($converter, $displayCurrency) {
                return $converter->convert(
                    (float) $tx->amount,
                    $tx->wallet?->currency ?: 'USD',
                    $displayCurrency
                );
            });

        $monthExpense = $monthTransactions
            ->where('type', 'expense')
            ->sum(function (Transaction $tx) use ($converter, $displayCurrency) {
                return $converter->convert(
                    (float) $tx->amount,
                    $tx->wallet?->currency ?: 'USD',
                    $displayCurrency
                );
            });

        $budgets = Budget::with('category:id,name,color,icon')
            ->where('user_id', $user->id)
            ->where('month', $now->month)
            ->where('year', $now->year)
            ->get()
            ->map(function (Budget $budget) use ($user, $now, $converter, $displayCurrency) {
                $spent = Transaction::with('wallet:id,currency')
                    ->where('user_id', $user->id)
                    ->where('type', 'expense')
                    ->where('category_id', $budget->category_id)
                    ->whereMonth('transaction_date', $now->month)
                    ->whereYear('transaction_date', $now->year)
                    ->get(['id', 'wallet_id', 'amount'])
                    ->sum(function (Transaction $tx) use ($converter, $displayCurrency) {
                        return $converter->convert(
                            (float) $tx->amount,
                            $tx->wallet?->currency ?: 'USD',
                            $displayCurrency
                        );
                    });

                $spent = round((float) $spent, 2);

                return [
                    ...$budget->toArray(),
                    'spent' => $spent,
                    'remaining' => round((float) $budget->amount - $spent, 2),
                    'percent' => $budget->amount > 0
                        ? min(100, round(($spent / (float) $budget->amount) * 100, 1))
                        : 0,
                ];
            });

        $recentTransactions = $user->transactions()
            ->with('wallet:id,name,color,currency')
            ->latest('transaction_date')
            ->latest('id')
            ->limit(8)
            ->get()
            ->map(function (Transaction $tx) use ($converter, $displayCurrency) {
                $walletCurrency = $tx->wallet?->currency ?: 'USD';

                return [
                    ...$tx->toArray(),
                    'display_amount' => round($converter->convert(
                        (float) $tx->amount,
                        $walletCurrency,
                        $displayCurrency
                    ), 2),
                    'wallet_currency' => $walletCurrency,
                ];
            });

        $goals = SavingsGoal::where('user_id', $user->id)
            ->orderBy('deadline')
            ->limit(4)
            ->get()
            ->map(function (SavingsGoal $goal) {
                return [
                    ...$goal->toArray(),
                    'percent' => $goal->target_amount > 0
                        ? min(100, round(((float) $goal->current_amount / (float) $goal->target_amount) * 100, 1))
                        : 0,
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_balance' => round($totalBalance, 2),
                'month_income' => round($monthIncome, 2),
                'month_expense' => round($monthExpense, 2),
                'month_net' => round($monthIncome - $monthExpense, 2),
                'currency' => $displayCurrency,
            ],
            'wallets' => $wallets,
            'recentTransactions' => $recentTransactions,
            'budgets' => $budgets,
            'goals' => $goals,
        ]);
    }
}
