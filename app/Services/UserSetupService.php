<?php

namespace App\Services;

use App\Models\ExpenseCategory;
use App\Models\IncomeCategory;
use App\Models\Setting;
use App\Models\User;
use App\Models\Wallet;

class UserSetupService
{
    public function bootstrap(User $user): void
    {
        Setting::firstOrCreate(
            ['user_id' => $user->id],
            [
                'theme' => 'light',
                'currency' => $user->currency ?? 'USD',
                'language' => $user->language ?? 'en',
                'date_format' => 'Y-m-d',
                'notification' => true,
            ]
        );

        Wallet::firstOrCreate(
            ['user_id' => $user->id, 'name' => 'Cash'],
            [
                'type' => 'Cash',
                'balance' => 0,
                'currency' => $user->currency ?? 'USD',
                'color' => '#22c55e',
                'icon' => 'cash',
                'status' => 'active',
            ]
        );

        foreach (
            [
                ['name' => 'Salary', 'icon' => 'salary', 'color' => '#22c55e'],
                ['name' => 'Bonus', 'icon' => 'bonus', 'color' => '#16a34a'],
                ['name' => 'Freelance', 'icon' => 'freelance', 'color' => '#15803d'],
                ['name' => 'Investment', 'icon' => 'investment', 'color' => '#166534'],
                ['name' => 'Gift', 'icon' => 'gift', 'color' => '#14532d'],
            ] as $category
        ) {
            IncomeCategory::firstOrCreate(
                ['user_id' => $user->id, 'name' => $category['name']],
                $category
            );
        }

        foreach (
            [
                ['name' => 'Food', 'icon' => 'food', 'color' => '#ef4444'],
                ['name' => 'Transport', 'icon' => 'transport', 'color' => '#f97316'],
                ['name' => 'Shopping', 'icon' => 'shopping', 'color' => '#eab308'],
                ['name' => 'Entertainment', 'icon' => 'entertainment', 'color' => '#a855f7'],
                ['name' => 'Bills', 'icon' => 'bills', 'color' => '#3b82f6'],
            ] as $category
        ) {
            ExpenseCategory::firstOrCreate(
                ['user_id' => $user->id, 'name' => $category['name']],
                $category
            );
        }
    }
}
