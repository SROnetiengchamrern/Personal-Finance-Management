<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::updateOrCreate(['name' => 'admin']);
        Role::updateOrCreate(['name' => 'user']);

        $permissions = [
            'manage_users',
            'manage_wallets',
            'manage_transactions',
            'manage_budgets',
            'manage_settings',
        ];

        foreach ($permissions as $name) {
            $permission = Permission::updateOrCreate(['name' => $name]);
            $admin->permissions()->syncWithoutDetaching([$permission->id]);
        }
    }
}
