<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = $request->user()?->language
            ?? $request->session()->get('locale')
            ?? 'en';
        if (! in_array($locale, ['en', 'km'], true)) {
            $locale = 'en';
        }

        app()->setLocale($locale);

        return [
            ...parent::share($request),
            'locale' => $locale,
            'auth' => [
                'user' => $request->user(),
                'isAdmin' => fn () => $request->user()?->isAdmin() ?? false,
                'roles' => fn () => $request->user()
                    ? $request->user()->roles()->pluck('name')
                    : [],
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'unreadNotifications' => fn () => $request->user()
                ? \App\Models\AppNotification::where('user_id', $request->user()->id)->where('is_read', false)->count()
                : 0,
        ];
    }
}
