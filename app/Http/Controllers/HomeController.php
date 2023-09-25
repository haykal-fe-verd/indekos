<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $kamarTerbaru = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->limit(4)->latest()->get();

        $query = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_kamar', 'LIKE', "%$search%")
                    ->orWhere('deskripsi_kamar', 'LIKE', "%$search%")
                    ->orWhere('luas_kamar', 'LIKE', "%$search%")
                    ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                    ->orWhere('harga_kamar', 'LIKE', "%$search%")
                    ->orWhere('jenis_sewa', 'LIKE', "%$search%");
            });
        }

        $kamar = $query->paginate($request->perpage ?? 16)->withQueryString();

        return Inertia::render('guest/home/index', compact('kamarTerbaru', 'kamar'));
    }

    public function daftarKamar(Request $request): Response
    {
        $query = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_kamar', 'LIKE', "%$search%")
                    ->orWhere('deskripsi_kamar', 'LIKE', "%$search%")
                    ->orWhere('luas_kamar', 'LIKE', "%$search%")
                    ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                    ->orWhere('harga_kamar', 'LIKE', "%$search%")
                    ->orWhere('jenis_sewa', 'LIKE', "%$search%");
            });
        }

        $kamar = $query->paginate($request->perpage ?? 16)->withQueryString();

        return Inertia::render('guest/daftar-kamar/index', compact('kamar'));
    }

    public function detailKamar(string $id): Response
    {
        $kamar = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->findOrFail($id);

        return Inertia::render('guest/detail-kamar', compact('kamar'));
    }
}
