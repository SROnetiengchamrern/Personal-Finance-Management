<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Models\IncomeCategory;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = $request->user()
            ->transactions()
            ->with(['wallet:id,name,color'])
            ->latest('transaction_date')
            ->latest('id');

        if ($request->filled('type')) {
            $query->where('type', $request->string('type'));
        }

        if ($request->filled('wallet_id')) {
            $query->where('wallet_id', $request->integer('wallet_id'));
        }

        return Inertia::render('Transactions/Index', [
            'transactions' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['type', 'wallet_id']),
            'wallets' => $request->user()->wallets()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Transactions/Create', $this->formData($request));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateTransaction($request);
        $this->authorizeWallet($request, $validated['wallet_id']);

        DB::transaction(function () use ($request, $validated) {
            $transaction = $request->user()->transactions()->create($validated);
            $this->applyWalletBalance($transaction, 'create');
        });

        return redirect()->route('transactions.index')->with('success', 'Transaction added.');
    }

    public function edit(Request $request, Transaction $transaction): Response
    {
        $this->authorizeTransaction($request, $transaction);

        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction,
            ...$this->formData($request),
        ]);
    }

    public function update(Request $request, Transaction $transaction): RedirectResponse
    {
        $this->authorizeTransaction($request, $transaction);
        $validated = $this->validateTransaction($request);
        $this->authorizeWallet($request, $validated['wallet_id']);

        DB::transaction(function () use ($transaction, $validated) {
            $this->applyWalletBalance($transaction, 'delete');
            $transaction->update($validated);
            $this->applyWalletBalance($transaction->fresh(), 'create');
        });

        return redirect()->route('transactions.index')->with('success', 'Transaction updated.');
    }

    public function destroy(Request $request, Transaction $transaction): RedirectResponse
    {
        $this->authorizeTransaction($request, $transaction);

        DB::transaction(function () use ($transaction) {
            $this->applyWalletBalance($transaction, 'delete');
            $transaction->delete();
        });

        return redirect()->route('transactions.index')->with('success', 'Transaction deleted.');
    }

    private function formData(Request $request): array
    {
        return [
            'wallets' => $request->user()->wallets()->where('status', 'active')->orderBy('name')->get(['id', 'name', 'currency']),
            'incomeCategories' => IncomeCategory::where('user_id', $request->user()->id)->orderBy('name')->get(['id', 'name', 'color']),
            'expenseCategories' => ExpenseCategory::where('user_id', $request->user()->id)->orderBy('name')->get(['id', 'name', 'color']),
        ];
    }

    private function validateTransaction(Request $request): array
    {
        return $request->validate([
            'wallet_id' => ['required', 'exists:wallets,id'],
            'category_id' => ['nullable', 'integer'],
            'type' => ['required', Rule::in(['income', 'expense'])],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'note' => ['nullable', 'string', 'max:1000'],
            'transaction_date' => ['required', 'date'],
        ]);
    }

    private function applyWalletBalance(Transaction $transaction, string $action): void
    {
        $wallet = Wallet::find($transaction->wallet_id);
        if (! $wallet) {
            return;
        }

        $amount = (float) $transaction->amount;
        $delta = $transaction->type === 'income' ? $amount : -$amount;

        if ($action === 'delete') {
            $delta = -$delta;
        }

        $wallet->increment('balance', $delta);
    }

    private function authorizeTransaction(Request $request, Transaction $transaction): void
    {
        abort_unless($transaction->user_id === $request->user()->id, 403);
    }

    private function authorizeWallet(Request $request, int $walletId): void
    {
        abort_unless(
            Wallet::where('id', $walletId)->where('user_id', $request->user()->id)->exists(),
            403
        );
    }
}
