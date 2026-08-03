<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\ExpenseCategory;
use App\Models\Transaction;
use App\Services\CurrencyConverter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BudgetController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $month = (int) $request->input('month', now()->month);
        $year = (int) $request->input('year', now()->year);
        $displayCurrency = strtoupper($user->currency ?? 'USD');
        $converter = app(CurrencyConverter::class);

        $budgets = Budget::with('category:id,name,color,icon')
            ->where('user_id', $user->id)
            ->where('month', $month)
            ->where('year', $year)
            ->get()
            ->map(function (Budget $budget) use ($user, $month, $year, $converter, $displayCurrency) {
                $spent = Transaction::with('wallet:id,currency')
                    ->where('user_id', $user->id)
                    ->where('type', 'expense')
                    ->where('category_id', $budget->category_id)
                    ->whereMonth('transaction_date', $month)
                    ->whereYear('transaction_date', $year)
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
                    'currency' => $displayCurrency,
                ];
            });

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'filters' => compact('month', 'year'),
            'currency' => $displayCurrency,
            'categories' => ExpenseCategory::where('user_id', $user->id)->orderBy('name')->get(['id', 'name', 'color']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:expense_categories,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'month' => ['required', 'integer', 'between:1,12'],
            'year' => ['required', 'integer', 'min:2000'],
        ]);

        abort_unless(
            ExpenseCategory::where('id', $validated['category_id'])
                ->where('user_id', $request->user()->id)
                ->exists(),
            403
        );

        Budget::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'category_id' => $validated['category_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            ['amount' => $validated['amount']]
        );

        return back()->with('success', 'Budget saved.');
    }

    public function destroy(Request $request, Budget $budget): RedirectResponse
    {
        abort_unless($budget->user_id === $request->user()->id, 403);
        $budget->delete();

        return back()->with('success', 'Budget deleted.');
    }
}
