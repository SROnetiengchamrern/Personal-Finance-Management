<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseCategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = ExpenseCategory::where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get();

        return Inertia::render('ExpenseCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ExpenseCategories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $request->user()->expenseCategories()->create([
            ...$validated,
            'icon' => $validated['icon'] ?? 'expense',
            'color' => $validated['color'] ?? '#dc2626',
        ]);

        return redirect()->route('expense-categories.index')->with('success', 'Expense category created.');
    }

    public function edit(Request $request, ExpenseCategory $expense_category): Response
    {
        abort_unless($expense_category->user_id === $request->user()->id, 403);

        return Inertia::render('ExpenseCategories/Edit', [
            'category' => $expense_category,
        ]);
    }

    public function update(Request $request, ExpenseCategory $expense_category): RedirectResponse
    {
        abort_unless($expense_category->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $expense_category->update($validated);

        return redirect()->route('expense-categories.index')->with('success', 'Expense category updated.');
    }

    public function destroy(Request $request, ExpenseCategory $expense_category): RedirectResponse
    {
        abort_unless($expense_category->user_id === $request->user()->id, 403);
        $expense_category->delete();

        return redirect()->route('expense-categories.index')->with('success', 'Expense category deleted.');
    }
}
