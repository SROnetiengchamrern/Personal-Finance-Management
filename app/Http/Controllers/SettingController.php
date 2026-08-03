<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(Request $request): Response
    {
        $settings = Setting::firstOrCreate(
            ['user_id' => $request->user()->id],
            [
                'theme' => 'light',
                'currency' => $request->user()->currency ?? 'USD',
                'language' => $request->user()->language ?? 'en',
                'date_format' => 'Y-m-d',
                'notification' => true,
            ]
        );

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
            'currencies' => Currency::orderBy('code')->get(['id', 'code', 'symbol', 'name']),
            'user' => $request->user()->only(['name', 'email', 'phone', 'currency', 'timezone', 'language', 'avatar']),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'theme' => ['required', 'string', 'max:30'],
            'currency' => ['required', 'string', 'max:10'],
            'language' => ['required', 'string', 'in:en,km'],
            'date_format' => ['required', 'string', 'max:30'],
            'notification' => ['required', 'boolean'],
            'timezone' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        Setting::updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'theme' => $validated['theme'],
                'currency' => $validated['currency'],
                'language' => $validated['language'],
                'date_format' => $validated['date_format'],
                'notification' => $validated['notification'],
            ]
        );

        $request->user()->update([
            'currency' => $validated['currency'],
            'language' => $validated['language'],
            'timezone' => $validated['timezone'] ?? $request->user()->timezone,
            'phone' => $validated['phone'] ?? $request->user()->phone,
        ]);

        return back()->with('success', 'Settings saved.');
    }
}
