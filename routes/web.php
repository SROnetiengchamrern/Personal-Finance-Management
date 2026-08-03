<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\IncomeCategoryController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecurringTransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SavingsGoalController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

Route::put('/language', [LanguageController::class, 'update'])->name('language.update');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::resource('wallets', WalletController::class)->except(['show']);

    Route::resource('transactions', TransactionController::class)->except(['show']);

    Route::resource('transfers', TransferController::class)->only(['index', 'create', 'store', 'destroy']);

    Route::get('/budgets', [BudgetController::class, 'index'])->name('budgets.index');
    Route::post('/budgets', [BudgetController::class, 'store'])->name('budgets.store');
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy'])->name('budgets.destroy');

    Route::resource('savings', SavingsGoalController::class);
    Route::post('/savings/{saving}/transactions', [SavingsGoalController::class, 'storeTransaction'])
        ->name('savings.transactions.store');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{kind}/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{kind}/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::resource('income-categories', IncomeCategoryController::class)->except(['show']);
    Route::resource('expense-categories', ExpenseCategoryController::class)->except(['show']);

    Route::resource('salaries', SalaryController::class)->except(['show']);

    Route::resource('users', UserController::class)->except(['create', 'edit']);

    Route::resource('recurring', RecurringTransactionController::class)->except(['show']);

    Route::resource('currencies', CurrencyController::class)->except(['show', 'create', 'edit']);

    Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.read-all');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
