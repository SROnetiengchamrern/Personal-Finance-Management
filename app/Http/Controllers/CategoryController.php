<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Models\IncomeCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Categories/Index', [
            'incomeCategories' => IncomeCategory::where('user_id', $request->user()->id)->orderBy('name')->get(),
            'expenseCategories' => ExpenseCategory::where('user_id', $request->user()->id)->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'kind' => ['required', Rule::in(['income', 'expense'])],
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $payload = [
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'icon' => $validated['icon'] ?? null,
            'color' => $validated['color'] ?? ($validated['kind'] === 'income' ? '#16a34a' : '#dc2626'),
        ];

        if ($validated['kind'] === 'income') {
            IncomeCategory::create($payload);
        } else {
            ExpenseCategory::create($payload);
        }

        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, string $kind, int $category): RedirectResponse
    {
        abort_unless(in_array($kind, ['income', 'expense'], true), 404);

        $model = $kind === 'income'
            ? IncomeCategory::where('user_id', $request->user()->id)->findOrFail($category)
            : ExpenseCategory::where('user_id', $request->user()->id)->findOrFail($category);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $model->update($validated);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(Request $request, string $kind, int $category): RedirectResponse
    {
        abort_unless(in_array($kind, ['income', 'expense'], true), 404);

        $model = $kind === 'income'
            ? IncomeCategory::where('user_id', $request->user()->id)->findOrFail($category)
            : ExpenseCategory::where('user_id', $request->user()->id)->findOrFail($category);

        $model->delete();

        return back()->with('success', 'Category deleted.');
    }
}
