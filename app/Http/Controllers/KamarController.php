<?php

namespace App\Http\Controllers;

use App\Models\FasilitasKamar;
use App\Models\FotoKamar;
use App\Models\Kamar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KamarController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Kamar::with(['kategori'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_kamar', 'LIKE', "%$search%")
                    ->orWhere('deskripsi_kamar', 'LIKE', "%$search%")
                    ->orWhere('luas_kamar', 'LIKE', "%$search%")
                    ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                    ->orWhere('harga_kamar', 'LIKE', "%$search%")
                    ->orWhere('jenis_sewa', 'LIKE', "%$search%")
                    ->orWhereHas('kategori', function ($query) use ($search) {
                        $query->where('nama_kategori', 'LIKE', "%$search%");
                    });
            });
        }

        $kamar = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/kamar/index', compact('kamar'));
    }

    public function create(): Response
    {
        return Inertia::render('auth/kamar/create');
    }

    public function edit(string $id): Response
    {
        $kamar = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->findOrFail($id);

        return Inertia::render('auth/kamar/edit', compact('kamar'));
    }

    public function show(string $id): Response
    {
        $kamar = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->findOrFail($id);
        return Inertia::render('auth/kamar/show', compact('kamar'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'kategori_id' => 'required',
            'nama_kamar' => 'required',
            'deskripsi_kamar' => 'required',
            'luas_kamar' => 'required',
            'lokasi_kamar' => 'required',
            'harga_kamar' => 'required',
            'jenis_sewa' => 'required',
            'foto.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'nama_fasilitas.*' => 'required|string|max:255',
        ]);

        $kamar = new Kamar();
        $kamar->kategori_id = $request->input('kategori_id');
        $kamar->nama_kamar = $request->input('nama_kamar');
        $kamar->deskripsi_kamar = $request->input('deskripsi_kamar');
        $kamar->luas_kamar = $request->input('luas_kamar');
        $kamar->lokasi_kamar = $request->input('lokasi_kamar');
        $kamar->harga_kamar = $request->input('harga_kamar');
        $kamar->jenis_sewa = $request->input('jenis_sewa');
        $kamar->save();

        foreach ($request->foto as $foto) {
            $path = $foto->store('foto', 'public');

            $fotoKamar = new FotoKamar();
            $fotoKamar->kamar_id = $kamar->id;
            $fotoKamar->foto = $path;
            $fotoKamar->save();
        }

        foreach ($request->input('nama_fasilitas') as $item) {
            $fasilitas = new FasilitasKamar();
            $fasilitas->kamar_id = $kamar->id;
            $fasilitas->nama_fasilitas = $item;
            $fasilitas->save();
        }

        return redirect()->route('kamar.index')->with('success', "Kamar Berhasil ditambahkan");
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'kategori_id' => 'required',
            'nama_kamar' => 'required',
            'deskripsi_kamar' => 'required',
            'luas_kamar' => 'required',
            'lokasi_kamar' => 'required',
            'harga_kamar' => 'required',
            'jenis_sewa' => 'required',
            'foto.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'nama_fasilitas.*' => 'required|string|max:255',
        ]);
        // dd($request->all());

        $kamar = Kamar::findOrFail($id);
        $kamar->kategori_id = $request->input('kategori_id');
        $kamar->nama_kamar = $request->input('nama_kamar');
        $kamar->deskripsi_kamar = $request->input('deskripsi_kamar');
        $kamar->luas_kamar = $request->input('luas_kamar');
        $kamar->lokasi_kamar = $request->input('lokasi_kamar');
        $kamar->harga_kamar = $request->input('harga_kamar');
        $kamar->jenis_sewa = $request->input('jenis_sewa');
        $kamar->save();

        if ($request->hasFile('foto')) {
            FotoKamar::where('kamar_id', $kamar->id)->delete();

            foreach ($request->foto as $foto) {
                $path = $foto->store('foto', 'public');

                $fotoKamar = new FotoKamar();
                $fotoKamar->kamar_id = $kamar->id;
                $fotoKamar->foto = $path;
                $fotoKamar->save();
            }
        }

        if ($request->nama_fasilitas) {
            $kamar->fasilitas_kamar()->delete();
            foreach ($request->input('nama_fasilitas') as $item) {
                $fasilitas = new FasilitasKamar();
                $fasilitas->kamar_id = $kamar->id;
                $fasilitas->nama_fasilitas = $item;
                $fasilitas->save();
            }
        }


        return redirect()->route('kamar.index')->with('success', "Kamar Berhasil di Edit");
    }

    public function destroy(string $id): RedirectResponse
    {
        $kamar = Kamar::findOrFail($id);
        $kamar->delete();

        return redirect()->route('kamar.index')->with('success', 'Kamar berhasil dihapus');
    }
}
