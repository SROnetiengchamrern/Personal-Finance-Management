<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LanguageController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'language' => ['required', Rule::in(['en', 'km'])],
        ]);

        $language = $validated['language'];

        $request->session()->put('locale', $language);

        $user = $request->user();

        if ($user) {
            $user->update([
                'language' => $language,
            ]);

            $setting = Setting::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'theme' => 'light',
                    'currency' => $user->currency ?? 'USD',
                    'language' => $language,
                    'date_format' => 'Y-m-d',
                    'notification' => true,
                ]
            );

            if (! $setting->wasRecentlyCreated) {
                $setting->update(['language' => $language]);
            }
        }

        return back();
    }
}
