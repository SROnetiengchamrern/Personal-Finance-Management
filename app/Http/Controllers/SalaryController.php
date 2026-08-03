<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\IncomeCategory;
use App\Models\Salary;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SalaryController extends Controller
{
    public function index(Request $request): Response
    {
        $year = (int) $request->input('year', now()->year);

        $salaries = Salary::with('wallet:id,name,currency,color')
            ->where('user_id', $request->user()->id)
            ->where('year', $year)
            ->orderByDesc('month')
            ->orderByDesc('payment_date')
            ->get();

        $years = Salary::where('user_id', $request->user()->id)
            ->select('year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year');

        if ($years->isEmpty()) {
            $years = collect([now()->year]);
        } elseif (! $years->contains($year)) {
            $years = $years->prepend($year)->unique()->values();
        }

        return Inertia::render('Salaries/Index', [
            'salaries' => $salaries,
            'filters' => ['year' => $year],
            'years' => $years,
            'total' => (float) $salaries->sum('amount'),
            'currency' => $request->user()->currency ?? 'USD',
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Salaries/Create', $this->formData($request));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateSalary($request);
        $this->authorizeWallet($request, $validated['wallet_id'] ?? null);

        DB::transaction(function () use ($request, $validated) {
            $salary = $request->user()->salaries()->create($validated);

            if (! empty($validated['wallet_id'])) {
                $this->creditWallet($request, $salary);
            }
        });

        return redirect()->route('salaries.index', ['year' => $validated['year']])
            ->with('success', 'Salary recorded.');
    }

    public function edit(Request $request, Salary $salary): Response
    {
        abort_unless($salary->user_id === $request->user()->id, 403);

        return Inertia::render('Salaries/Edit', [
            'salary' => $salary,
            ...$this->formData($request),
        ]);
    }

    public function update(Request $request, Salary $salary): RedirectResponse
    {
        abort_unless($salary->user_id === $request->user()->id, 403);

        $validated = $this->validateSalary($request, $salary->id);
        $this->authorizeWallet($request, $validated['wallet_id'] ?? null);

        $salary->update($validated);

        return redirect()->route('salaries.index', ['year' => $validated['year']])
            ->with('success', 'Salary updated.');
    }

    public function destroy(Request $request, Salary $salary): RedirectResponse
    {
        abort_unless($salary->user_id === $request->user()->id, 403);

        $year = $salary->year;
        $salary->delete();

        return redirect()->route('salaries.index', ['year' => $year])
            ->with('success', 'Salary deleted.');
    }

    private function formData(Request $request): array
    {
        return [
            'wallets' => $request->user()
                ->wallets()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name', 'currency', 'balance']),
            'currencies' => Currency::orderBy('code')->get(['id', 'code', 'symbol', 'name']),
        ];
    }

    private function validateSalary(Request $request, ?int $ignoreId = null): array
    {
        $data = $request->validate([
            'wallet_id' => ['nullable', 'exists:wallets,id'],
            'title' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'currency' => ['required', 'string', 'max:10', Rule::exists('currencies', 'code')],
            'month' => ['required', 'integer', 'between:1,12'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'payment_date' => ['required', 'date'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        $data['currency'] = strtoupper($data['currency']);

        $exists = Salary::where('user_id', $request->user()->id)
            ->where('month', $data['month'])
            ->where('year', $data['year'])
            ->where('currency', $data['currency'])
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'month' => 'Salary for this month, year, and currency already exists.',
            ]);
        }

        return $data;
    }

    private function authorizeWallet(Request $request, mixed $walletId): void
    {
        if (! $walletId) {
            return;
        }

        abort_unless(
            Wallet::where('id', $walletId)->where('user_id', $request->user()->id)->exists(),
            403
        );
    }

    private function creditWallet(Request $request, Salary $salary): void
    {
        $wallet = Wallet::where('id', $salary->wallet_id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $wallet) {
            return;
        }

        $wallet->increment('balance', $salary->amount);

        $salaryCategory = IncomeCategory::firstOrCreate(
            ['user_id' => $request->user()->id, 'name' => 'Salary'],
            ['icon' => 'salary', 'color' => '#22c55e']
        );

        Transaction::create([
            'user_id' => $request->user()->id,
            'wallet_id' => $wallet->id,
            'category_id' => $salaryCategory->id,
            'type' => 'income',
            'amount' => $salary->amount,
            'note' => $salary->title.' ('.$salary->month.'/'.$salary->year.')',
            'transaction_date' => $salary->payment_date,
        ]);
    }
}
