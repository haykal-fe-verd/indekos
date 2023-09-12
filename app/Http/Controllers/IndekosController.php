<?php

namespace App\Http\Controllers;

use App\Models\Indekos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class IndekosController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('auth/indekos/index');
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => 'required',
            'deskripsi' => 'required',
            'instagram' => 'required',
            'whatsapp' => 'required',
        ]);

        $indekos = Indekos::first();

        if ($indekos) {
            if ($request->hasFile('logo')) {
                $oldLogoPath = $indekos->logo;
                if ($oldLogoPath) {
                    Storage::disk('public')->delete($oldLogoPath);
                }

                $logoPath = $request->file('logo')->store('logo', 'public');
                $indekos->logo = $logoPath;
            }

            $indekos->nama = $request->input('nama');
            $indekos->deskripsi = $request->input('deskripsi');
            $indekos->instagram = $request->input('instagram');
            $indekos->whatsapp = $request->input('whatsapp');
            $indekos->save();
        } else {
            $indekos = new Indekos();

            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($request->hasFile('logo')) {
                $oldLogoPath = $indekos->logo;
                if ($oldLogoPath) {
                    Storage::disk('public')->delete($oldLogoPath);
                }

                $logoPath = $request->file('logo')->store('logo', 'public');
                $indekos->logo = $logoPath;
            }

            $indekos->nama = $request->input('nama');
            $indekos->deskripsi = $request->input('deskripsi');
            $indekos->instagram = $request->input('instagram');
            $indekos->whatsapp = $request->input('whatsapp');
            $indekos->save();
        }

        return redirect()->route('indekos.index')->with('success', "Setting Kos berhasil di update");
    }
}
