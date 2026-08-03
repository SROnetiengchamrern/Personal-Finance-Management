<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $this->ensureAdmin($request);

        $users = User::with('roles:id,name')
            ->withCount(['wallets', 'transactions', 'salaries'])
            ->latest()
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'currency' => $user->currency,
                'timezone' => $user->timezone,
                'language' => $user->language,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'roles' => $user->roles->pluck('name'),
                'wallets_count' => $user->wallets_count,
                'transactions_count' => $user->transactions_count,
                'salaries_count' => $user->salaries_count,
            ]);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function show(Request $request, User $user): Response
    {
        $this->ensureAdmin($request);

        $user->load('roles:id,name', 'settings');

        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'currency' => $user->currency,
                'timezone' => $user->timezone,
                'language' => $user->language,
                'avatar' => $user->avatar,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->roles->pluck('name'),
                'settings' => $user->settings,
                'wallets_count' => $user->wallets()->count(),
                'transactions_count' => $user->transactions()->count(),
                'salaries_count' => $user->salaries()->count(),
                'budgets_count' => $user->budgets()->count(),
                'savings_goals_count' => $user->savingsGoals()->count(),
            ],
            'roles' => Role::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'currency' => ['nullable', 'string', 'max:10'],
            'role_id' => ['nullable', 'exists:roles,id'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'currency' => $validated['currency'] ?? 'USD',
            'timezone' => 'Asia/Phnom_Penh',
            'language' => 'en',
            'email_verified_at' => now(),
        ]);

        if (! empty($validated['role_id'])) {
            $user->roles()->sync([$validated['role_id']]);
        } else {
            $userRole = Role::where('name', 'user')->first();
            if ($userRole) {
                $user->roles()->sync([$userRole->id]);
            }
        }

        app(\App\Services\UserSetupService::class)->bootstrap($user);

        return redirect()->route('users.index')->with('success', 'User created.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'currency' => ['nullable', 'string', 'max:10'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'currency' => $validated['currency'] ?? $user->currency,
        ]);

        if (! empty($validated['password'])) {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        if (array_key_exists('role_id', $validated)) {
            $user->roles()->sync($validated['role_id'] ? [$validated['role_id']] : []);
        }

        return back()->with('success', 'User updated.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $this->ensureAdmin($request);

        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot delete your own account here.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted.');
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->isAdmin(), 403);
    }
}
