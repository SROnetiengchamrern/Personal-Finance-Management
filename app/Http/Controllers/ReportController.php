<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Models\Transaction;
use App\Services\CurrencyConverter;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $month = (int) $request->input('month', now()->month);
        $year = (int) $request->input('year', now()->year);
        $displayCurrency = strtoupper($user->currency ?? 'USD');
        $converter = app(CurrencyConverter::class);

        $transactions = $user->transactions()
            ->with('wallet:id,currency')
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->get(['id', 'wallet_id', 'category_id', 'type', 'amount', 'transaction_date']);

        $toDisplay = function (Transaction $tx) use ($converter, $displayCurrency): float {
            return $converter->convert(
                (float) $tx->amount,
                $tx->wallet?->currency ?: 'USD',
                $displayCurrency
            );
        };

        $income = round($transactions->where('type', 'income')->sum($toDisplay), 2);
        $expense = round($transactions->where('type', 'expense')->sum($toDisplay), 2);

        $categories = ExpenseCategory::where('user_id', $user->id)
            ->orderBy('name')
            ->get(['id', 'name', 'color'])
            ->keyBy('id');

        $byCategory = $transactions
            ->where('type', 'expense')
            ->groupBy('category_id')
            ->map(function ($rows, $categoryId) use ($toDisplay, $categories, $expense) {
                $spent = round($rows->sum($toDisplay), 2);
                $category = $categories->get($categoryId);

                return [
                    'category_id' => $categoryId ? (int) $categoryId : null,
                    'name' => $category?->name ?? 'Uncategorized',
                    'color' => $category?->color ?? '#94a3b8',
                    'amount' => $spent,
                    'percent' => $expense > 0 ? round(($spent / $expense) * 100, 1) : 0,
                ];
            })
            ->sortByDesc('amount')
            ->values();

        $start = Carbon::create($year, $month, 1)->startOfMonth();
        $daysInMonth = $start->daysInMonth;
        $daily = [];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $dayRows = $transactions->filter(
                fn (Transaction $tx) => (int) $tx->transaction_date->format('j') === $day
            );

            $daily[] = [
                'day' => $day,
                'income' => round($dayRows->where('type', 'income')->sum($toDisplay), 2),
                'expense' => round($dayRows->where('type', 'expense')->sum($toDisplay), 2),
            ];
        }

        return Inertia::render('Reports/Index', [
            'filters' => compact('month', 'year'),
            'currency' => $displayCurrency,
            'summary' => [
                'income' => $income,
                'expense' => $expense,
                'net' => round($income - $expense, 2),
            ],
            'byCategory' => $byCategory,
            'daily' => $daily,
        ]);
    }
}
