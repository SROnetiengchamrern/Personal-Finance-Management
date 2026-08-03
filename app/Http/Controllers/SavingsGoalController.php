<?php

namespace App\Http\Controllers;

use App\Models\SavingTransaction;
use App\Models\SavingsGoal;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SavingsGoalController extends Controller
{
    public function index(Request $request): Response
    {
        $goals = $request->user()
            ->savingsGoals()
            ->latest()
            ->get()
            ->map(function (SavingsGoal $goal) {
                return [
                    ...$goal->toArray(),
                    'percent' => $goal->target_amount > 0
                        ? min(100, round(((float) $goal->current_amount / (float) $goal->target_amount) * 100, 1))
                        : 0,
                ];
            });

        return Inertia::render('Savings/Index', [
            'goals' => $goals,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Savings/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'target_amount' => ['required', 'numeric', 'min:0.01'],
            'current_amount' => ['nullable', 'numeric', 'min:0'],
            'deadline' => ['nullable', 'date'],
            'icon' => ['nullable', 'string', 'max:50'],
        ]);

        $request->user()->savingsGoals()->create([
            ...$validated,
            'current_amount' => $validated['current_amount'] ?? 0,
        ]);

        return redirect()->route('savings.index')->with('success', 'Savings goal created.');
    }

    public function show(Request $request, SavingsGoal $saving): Response
    {
        abort_unless($saving->user_id === $request->user()->id, 403);

        $saving->load(['savingTransactions.wallet:id,name']);

        return Inertia::render('Savings/Show', [
            'goal' => [
                ...$saving->toArray(),
                'percent' => $saving->target_amount > 0
                    ? min(100, round(((float) $saving->current_amount / (float) $saving->target_amount) * 100, 1))
                    : 0,
            ],
            'wallets' => $request->user()->wallets()->where('status', 'active')->orderBy('name')->get(['id', 'name', 'balance']),
        ]);
    }

    public function edit(Request $request, SavingsGoal $saving): Response
    {
        abort_unless($saving->user_id === $request->user()->id, 403);

        return Inertia::render('Savings/Edit', [
            'goal' => $saving,
        ]);
    }

    public function update(Request $request, SavingsGoal $saving): RedirectResponse
    {
        abort_unless($saving->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'target_amount' => ['required', 'numeric', 'min:0.01'],
            'deadline' => ['nullable', 'date'],
            'icon' => ['nullable', 'string', 'max:50'],
        ]);

        $saving->update($validated);

        return redirect()->route('savings.index')->with('success', 'Savings goal updated.');
    }

    public function destroy(Request $request, SavingsGoal $saving): RedirectResponse
    {
        abort_unless($saving->user_id === $request->user()->id, 403);
        $saving->delete();

        return redirect()->route('savings.index')->with('success', 'Savings goal deleted.');
    }

    public function storeTransaction(Request $request, SavingsGoal $saving): RedirectResponse
    {
        abort_unless($saving->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'wallet_id' => ['required', 'exists:wallets,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'type' => ['required', Rule::in(['deposit', 'withdraw'])],
        ]);

        abort_unless(
            Wallet::where('id', $validated['wallet_id'])->where('user_id', $request->user()->id)->exists(),
            403
        );

        DB::transaction(function () use ($saving, $validated) {
            SavingTransaction::create([
                'goal_id' => $saving->id,
                ...$validated,
            ]);

            if ($validated['type'] === 'deposit') {
                $saving->increment('current_amount', $validated['amount']);
                Wallet::where('id', $validated['wallet_id'])->decrement('balance', $validated['amount']);
            } else {
                abort_if($saving->current_amount < $validated['amount'], 422, 'Insufficient goal balance.');
                $saving->decrement('current_amount', $validated['amount']);
                Wallet::where('id', $validated['wallet_id'])->increment('balance', $validated['amount']);
            }
        });

        return back()->with('success', 'Savings transaction recorded.');
    }
}
