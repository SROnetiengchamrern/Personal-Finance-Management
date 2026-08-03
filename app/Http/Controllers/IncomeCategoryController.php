<?php

namespace App\Http\Controllers;

use App\Models\IncomeCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IncomeCategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = IncomeCategory::where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get();

        return Inertia::render('IncomeCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('IncomeCategories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $request->user()->incomeCategories()->create([
            ...$validated,
            'icon' => $validated['icon'] ?? 'income',
            'color' => $validated['color'] ?? '#059669',
        ]);

        return redirect()->route('income-categories.index')->with('success', 'Income category created.');
    }

    public function edit(Request $request, IncomeCategory $income_category): Response
    {
        abort_unless($income_category->user_id === $request->user()->id, 403);

        return Inertia::render('IncomeCategories/Edit', [
            'category' => $income_category,
        ]);
    }

    public function update(Request $request, IncomeCategory $income_category): RedirectResponse
    {
        abort_unless($income_category->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
        ]);

        $income_category->update($validated);

        return redirect()->route('income-categories.index')->with('success', 'Income category updated.');
    }

    public function destroy(Request $request, IncomeCategory $income_category): RedirectResponse
    {
        abort_unless($income_category->user_id === $request->user()->id, 403);
        $income_category->delete();

        return redirect()->route('income-categories.index')->with('success', 'Income category deleted.');
    }
}
