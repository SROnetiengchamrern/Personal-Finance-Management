<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Models\IncomeCategory;
use App\Models\RecurringTransaction;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RecurringTransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $items = $request->user()
            ->recurringTransactions()
            ->with('wallet:id,name')
            ->latest()
            ->get();

        return Inertia::render('Recurring/Index', [
            'items' => $items,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Recurring/Create', $this->formData($request));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateItem($request);
        $this->authorizeWallet($request, $validated['wallet_id']);

        $request->user()->recurringTransactions()->create([
            ...$validated,
            'status' => 'active',
        ]);

        return redirect()->route('recurring.index')->with('success', 'Recurring transaction created.');
    }

    public function edit(Request $request, RecurringTransaction $recurring): Response
    {
        abort_unless($recurring->user_id === $request->user()->id, 403);

        return Inertia::render('Recurring/Edit', [
            'item' => $recurring,
            ...$this->formData($request),
        ]);
    }

    public function update(Request $request, RecurringTransaction $recurring): RedirectResponse
    {
        abort_unless($recurring->user_id === $request->user()->id, 403);
        $validated = $this->validateItem($request);
        $this->authorizeWallet($request, $validated['wallet_id']);

        $recurring->update($validated);

        return redirect()->route('recurring.index')->with('success', 'Recurring transaction updated.');
    }

    public function destroy(Request $request, RecurringTransaction $recurring): RedirectResponse
    {
        abort_unless($recurring->user_id === $request->user()->id, 403);
        $recurring->delete();

        return redirect()->route('recurring.index')->with('success', 'Recurring transaction deleted.');
    }

    private function formData(Request $request): array
    {
        return [
            'wallets' => $request->user()->wallets()->where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'incomeCategories' => IncomeCategory::where('user_id', $request->user()->id)->orderBy('name')->get(['id', 'name']),
            'expenseCategories' => ExpenseCategory::where('user_id', $request->user()->id)->orderBy('name')->get(['id', 'name']),
        ];
    }

    private function validateItem(Request $request): array
    {
        return $request->validate([
            'wallet_id' => ['required', 'exists:wallets,id'],
            'category_id' => ['nullable', 'integer'],
            'type' => ['required', Rule::in(['income', 'expense'])],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'title' => ['required', 'string', 'max:255'],
            'frequency' => ['required', Rule::in(['daily', 'weekly', 'monthly', 'yearly'])],
            'next_run' => ['required', 'date'],
            'status' => ['nullable', Rule::in(['active', 'paused', 'completed'])],
        ]);
    }

    private function authorizeWallet(Request $request, int $walletId): void
    {
        abort_unless(
            Wallet::where('id', $walletId)->where('user_id', $request->user()->id)->exists(),
            403
        );
    }
}
