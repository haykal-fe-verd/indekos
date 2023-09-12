<?php

namespace App\Http\Middleware;

use App\Models\Indekos;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

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
    public function version(Request $request): string|null
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
        return [
            ...parent::share($request),
            'auth' => [
                'user' => [
                    'name' => $request->user()?->name,
                    'email' => $request->user()?->email,
                    'role' => $request->user()?->role,
                    'image' => $request->user()?->image,
                ],
            ],
            'sessions' => [
                'message' => session('message'),
                'success' => session('success'),
                'error' => session('error'),
            ],
            'indekos' => Indekos::first() ?? [
                'nama' => 'nama indekos',
                'deskripsi' => 'deskripsi indekos',
                'instagram' => 'instagram indekos',
                'whatsapp' => 'whatsapp indekos',
                'logo' => 'logo indekos',
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
