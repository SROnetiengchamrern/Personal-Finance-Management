<?php

namespace Database\Seeders;

use App\Models\AppNotification;
use App\Models\Attachment;
use App\Models\Budget;
use App\Models\Currency;
use App\Models\ExpenseCategory;
use App\Models\IncomeCategory;
use App\Models\Permission;
use App\Models\RecurringTransaction;
use App\Models\Role;
use App\Models\SavingTransaction;
use App\Models\SavingsGoal;
use App\Models\Setting;
use App\Models\Tag;
use App\Models\Transaction;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        $tables = [
            'transaction_tags',
            'attachments',
            'saving_transactions',
            'transactions',
            'transfers',
            'budgets',
            'recurring_transactions',
            'notifications',
            'tags',
            'savings_goals',
            'settings',
            'wallets',
            'income_categories',
            'expense_categories',
            'role_user',
            'permission_role',
            'permissions',
            'roles',
            'currencies',
            'users',
        ];

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // 1. currencies (5)
        $currencies = [
            ['code' => 'USD', 'symbol' => '$', 'name' => 'US Dollar', 'exchange_rate' => 1],
            ['code' => 'EUR', 'symbol' => '€', 'name' => 'Euro', 'exchange_rate' => 0.92],
            ['code' => 'KHR', 'symbol' => '៛', 'name' => 'Cambodian Riel', 'exchange_rate' => 4100],
            ['code' => 'THB', 'symbol' => '฿', 'name' => 'Thai Baht', 'exchange_rate' => 35.5],
            ['code' => 'GBP', 'symbol' => '£', 'name' => 'British Pound', 'exchange_rate' => 0.79],
        ];
        foreach ($currencies as $currency) {
            Currency::create($currency);
        }

        // 2. roles (5)
        $roleNames = ['admin', 'user', 'manager', 'accountant', 'viewer'];
        $roles = collect($roleNames)->map(fn ($name) => Role::create(['name' => $name]));

        // 3. permissions (5)
        $permissionNames = [
            'manage_users',
            'manage_wallets',
            'manage_transactions',
            'manage_budgets',
            'manage_settings',
        ];
        $permissions = collect($permissionNames)->map(fn ($name) => Permission::create(['name' => $name]));
        // Exactly 5 role-permission links
        $roles[0]->permissions()->attach($permissions->take(3)->pluck('id')); // admin: 3
        $roles[2]->permissions()->attach($permissions->slice(3, 2)->pluck('id')); // manager: 2

        // 4. users (5)
        $userDefs = [
            ['name' => 'Admin', 'email' => 'admin@financehub.com', 'phone' => '+85510000001', 'currency' => 'USD'],
            ['name' => 'Sokha Chen', 'email' => 'sokha@example.com', 'phone' => '+85510000002', 'currency' => 'KHR'],
            ['name' => 'Dara Kim', 'email' => 'dara@example.com', 'phone' => '+85510000003', 'currency' => 'USD'],
            ['name' => 'Sreymom Ly', 'email' => 'sreymom@example.com', 'phone' => '+85510000004', 'currency' => 'THB'],
            ['name' => 'Vannak Meas', 'email' => 'vannak@example.com', 'phone' => '+85510000005', 'currency' => 'USD'],
        ];

        $users = collect($userDefs)->map(function (array $def, int $i) use ($roles) {
            $user = User::create([
                ...$def,
                'password' => Hash::make('password'),
                'avatar' => null,
                'timezone' => 'Asia/Phnom_Penh',
                'language' => 'en',
                'email_verified_at' => now(),
            ]);

            $user->roles()->attach($roles[$i]->id);

            return $user;
        });

        $primary = $users[0];

        // 5. settings (5 — one per user)
        foreach ($users as $i => $user) {
            Setting::create([
                'user_id' => $user->id,
                'theme' => $i % 2 === 0 ? 'light' : 'dark',
                'currency' => $user->currency,
                'language' => 'en',
                'date_format' => $i % 2 === 0 ? 'Y-m-d' : 'd/m/Y',
                'notification' => true,
            ]);
        }

        // 6. wallets (5)
        $walletDefs = [
            ['name' => 'Cash', 'type' => 'Cash', 'balance' => 250.00, 'currency' => 'USD', 'color' => '#22c55e', 'icon' => 'cash'],
            ['name' => 'ABA Bank', 'type' => 'Bank', 'balance' => 1850.50, 'currency' => 'USD', 'color' => '#3b82f6', 'icon' => 'bank'],
            ['name' => 'ACLEDA', 'type' => 'Bank', 'balance' => 3200000, 'currency' => 'KHR', 'color' => '#0ea5e9', 'icon' => 'bank'],
            ['name' => 'Visa Card', 'type' => 'Credit Card', 'balance' => -120.00, 'currency' => 'USD', 'color' => '#f59e0b', 'icon' => 'card'],
            ['name' => 'Wing', 'type' => 'E-Wallet', 'balance' => 75.25, 'currency' => 'USD', 'color' => '#a855f7', 'icon' => 'ewallet'],
        ];

        $wallets = collect($walletDefs)->map(fn (array $def) => Wallet::create([
            ...$def,
            'user_id' => $primary->id,
            'status' => 'active',
        ]));

        // 7. income_categories (5)
        $incomeDefs = [
            ['name' => 'Salary', 'icon' => 'salary', 'color' => '#22c55e'],
            ['name' => 'Bonus', 'icon' => 'bonus', 'color' => '#16a34a'],
            ['name' => 'Freelance', 'icon' => 'freelance', 'color' => '#15803d'],
            ['name' => 'Investment', 'icon' => 'investment', 'color' => '#166534'],
            ['name' => 'Gift', 'icon' => 'gift', 'color' => '#14532d'],
        ];
        $incomeCategories = collect($incomeDefs)->map(fn (array $def) => IncomeCategory::create([
            ...$def,
            'user_id' => $primary->id,
        ]));

        // 8. expense_categories (5)
        $expenseDefs = [
            ['name' => 'Food', 'icon' => 'food', 'color' => '#ef4444'],
            ['name' => 'Transport', 'icon' => 'transport', 'color' => '#f97316'],
            ['name' => 'Shopping', 'icon' => 'shopping', 'color' => '#eab308'],
            ['name' => 'Entertainment', 'icon' => 'entertainment', 'color' => '#a855f7'],
            ['name' => 'Bills', 'icon' => 'bills', 'color' => '#3b82f6'],
        ];
        $expenseCategories = collect($expenseDefs)->map(fn (array $def) => ExpenseCategory::create([
            ...$def,
            'user_id' => $primary->id,
        ]));

        // 9. tags (5)
        $tagDefs = [
            ['name' => 'Work', 'color' => '#0f766e'],
            ['name' => 'Family', 'color' => '#db2777'],
            ['name' => 'Travel', 'color' => '#2563eb'],
            ['name' => 'Urgent', 'color' => '#dc2626'],
            ['name' => 'Personal', 'color' => '#7c3aed'],
        ];
        $tags = collect($tagDefs)->map(fn (array $def) => Tag::create([
            ...$def,
            'user_id' => $primary->id,
        ]));

        // 10. transactions (5)
        $transactionDefs = [
            [
                'wallet_id' => $wallets[1]->id,
                'category_id' => $incomeCategories[0]->id,
                'type' => 'income',
                'amount' => 1200,
                'note' => 'Monthly salary',
                'transaction_date' => now()->subDays(20)->toDateString(),
            ],
            [
                'wallet_id' => $wallets[0]->id,
                'category_id' => $expenseCategories[0]->id,
                'type' => 'expense',
                'amount' => 18.50,
                'note' => 'Lunch at cafe',
                'transaction_date' => now()->subDays(5)->toDateString(),
            ],
            [
                'wallet_id' => $wallets[1]->id,
                'category_id' => $expenseCategories[4]->id,
                'type' => 'expense',
                'amount' => 45.00,
                'note' => 'Internet bill',
                'transaction_date' => now()->subDays(8)->toDateString(),
            ],
            [
                'wallet_id' => $wallets[4]->id,
                'category_id' => $incomeCategories[2]->id,
                'type' => 'income',
                'amount' => 300,
                'note' => 'Freelance website',
                'transaction_date' => now()->subDays(3)->toDateString(),
            ],
            [
                'wallet_id' => $wallets[0]->id,
                'category_id' => $expenseCategories[1]->id,
                'type' => 'expense',
                'amount' => 6.00,
                'note' => 'Grab ride',
                'transaction_date' => now()->subDay()->toDateString(),
            ],
        ];

        $transactions = collect($transactionDefs)->map(fn (array $def) => Transaction::create([
            ...$def,
            'user_id' => $primary->id,
            'attachment' => null,
        ]));

        // 11. transaction_tags (5 links)
        $tagLinks = [
            [$transactions[0]->id, $tags[0]->id],
            [$transactions[1]->id, $tags[4]->id],
            [$transactions[2]->id, $tags[0]->id],
            [$transactions[3]->id, $tags[0]->id],
            [$transactions[4]->id, $tags[3]->id],
        ];
        foreach ($tagLinks as [$transactionId, $tagId]) {
            DB::table('transaction_tags')->insert([
                'transaction_id' => $transactionId,
                'tag_id' => $tagId,
            ]);
        }

        // 12. attachments (5)
        foreach ($transactions as $i => $transaction) {
            Attachment::create([
                'transaction_id' => $transaction->id,
                'file_name' => 'receipt-'.($i + 1).'.pdf',
                'file_path' => 'attachments/receipt-'.($i + 1).'.pdf',
            ]);
        }

        // 13. transfers (5)
        $transferDefs = [
            [$wallets[1]->id, $wallets[0]->id, 50, 'ATM cash out', now()->subDays(10)],
            [$wallets[1]->id, $wallets[4]->id, 30, 'Top up Wing', now()->subDays(7)],
            [$wallets[4]->id, $wallets[0]->id, 10, 'Cash from Wing', now()->subDays(4)],
            [$wallets[1]->id, $wallets[3]->id, 100, 'Pay credit card', now()->subDays(2)],
            [$wallets[0]->id, $wallets[4]->id, 15, 'Move to e-wallet', now()->subDay()],
        ];
        foreach ($transferDefs as [$from, $to, $amount, $note, $date]) {
            Transfer::create([
                'user_id' => $primary->id,
                'from_wallet_id' => $from,
                'to_wallet_id' => $to,
                'amount' => $amount,
                'note' => $note,
                'transfer_date' => $date->toDateString(),
            ]);
        }

        // 14. budgets (5)
        foreach ($expenseCategories as $i => $category) {
            Budget::create([
                'user_id' => $primary->id,
                'category_id' => $category->id,
                'amount' => [200, 80, 150, 100, 120][$i],
                'month' => now()->month,
                'year' => now()->year,
            ]);
        }

        // 15. savings_goals (5)
        $goalDefs = [
            ['name' => 'Emergency Fund', 'target_amount' => 3000, 'current_amount' => 850, 'deadline' => now()->addMonths(8), 'icon' => 'shield'],
            ['name' => 'New Laptop', 'target_amount' => 1200, 'current_amount' => 400, 'deadline' => now()->addMonths(4), 'icon' => 'laptop'],
            ['name' => 'Vacation Trip', 'target_amount' => 2000, 'current_amount' => 600, 'deadline' => now()->addMonths(10), 'icon' => 'plane'],
            ['name' => 'Motorbike', 'target_amount' => 1500, 'current_amount' => 250, 'deadline' => now()->addYear(), 'icon' => 'bike'],
            ['name' => 'Home Deposit', 'target_amount' => 10000, 'current_amount' => 2200, 'deadline' => now()->addYears(2), 'icon' => 'home'],
        ];
        $goals = collect($goalDefs)->map(fn (array $def) => SavingsGoal::create([
            ...$def,
            'user_id' => $primary->id,
            'deadline' => $def['deadline']->toDateString(),
        ]));

        // 16. saving_transactions (5)
        $savingTxDefs = [
            [$goals[0]->id, $wallets[1]->id, 200, 'deposit'],
            [$goals[0]->id, $wallets[1]->id, 150, 'deposit'],
            [$goals[1]->id, $wallets[1]->id, 100, 'deposit'],
            [$goals[2]->id, $wallets[4]->id, 50, 'deposit'],
            [$goals[1]->id, $wallets[0]->id, 25, 'withdraw'],
        ];
        foreach ($savingTxDefs as [$goalId, $walletId, $amount, $type]) {
            SavingTransaction::create([
                'goal_id' => $goalId,
                'wallet_id' => $walletId,
                'amount' => $amount,
                'type' => $type,
            ]);
        }

        // 17. recurring_transactions (5)
        $recurringDefs = [
            ['wallet_id' => $wallets[1]->id, 'category_id' => $incomeCategories[0]->id, 'type' => 'income', 'amount' => 1200, 'title' => 'Monthly Salary', 'frequency' => 'monthly'],
            ['wallet_id' => $wallets[1]->id, 'category_id' => $expenseCategories[4]->id, 'type' => 'expense', 'amount' => 45, 'title' => 'Internet Bill', 'frequency' => 'monthly'],
            ['wallet_id' => $wallets[0]->id, 'category_id' => $expenseCategories[0]->id, 'type' => 'expense', 'amount' => 5, 'title' => 'Coffee Habit', 'frequency' => 'daily'],
            ['wallet_id' => $wallets[1]->id, 'category_id' => $expenseCategories[1]->id, 'type' => 'expense', 'amount' => 20, 'title' => 'Weekly Transport Pass', 'frequency' => 'weekly'],
            ['wallet_id' => $wallets[1]->id, 'category_id' => $incomeCategories[3]->id, 'type' => 'income', 'amount' => 500, 'title' => 'Dividend Payout', 'frequency' => 'yearly'],
        ];
        foreach ($recurringDefs as $i => $def) {
            RecurringTransaction::create([
                ...$def,
                'user_id' => $primary->id,
                'next_run' => now()->addDays($i + 1)->toDateString(),
                'status' => 'active',
            ]);
        }

        // 18. notifications (5)
        $notificationDefs = [
            ['title' => 'Budget alert', 'message' => 'Food budget is at 80% this month.', 'is_read' => false],
            ['title' => 'Salary received', 'message' => 'Monthly salary was recorded successfully.', 'is_read' => true],
            ['title' => 'Savings reminder', 'message' => 'Add $50 to your Emergency Fund today.', 'is_read' => false],
            ['title' => 'Bill due soon', 'message' => 'Internet bill is due in 3 days.', 'is_read' => false],
            ['title' => 'Transfer completed', 'message' => 'Transfer from ABA Bank to Cash completed.', 'is_read' => true],
        ];
        foreach ($notificationDefs as $def) {
            AppNotification::create([
                ...$def,
                'user_id' => $primary->id,
            ]);
        }
    }
}
