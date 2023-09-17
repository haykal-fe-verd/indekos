<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->role === 'admin') {
            return Inertia::render('auth/dashboard/admin');
        } else {
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

            return Inertia::render('auth/dashboard/penyewa', compact('kamar'));
        }
    }
}
