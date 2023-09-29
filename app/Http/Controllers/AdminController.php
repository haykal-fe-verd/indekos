<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Pembayaran::with(['penyewa.user', 'kamar.kategori'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', "%$search%")
                    ->orWhere('updated_at', 'LIKE', "%$search%")
                    ->orWhereHas('kamar', function ($query) use ($search) {
                        $query->where('nama_kamar', 'LIKE', "%$search%")
                            ->orWhere('harga_kamar', 'LIKE', "%$search%")
                            ->orWhere('jenis_sewa', 'LIKE', "%$search%")
                            ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                            ->orWhereHas('kategori', function ($query) use ($search) {
                                $query->where('nama_kategori', 'LIKE', "%$search%");
                            });
                    });
            });
        }

        $transaksi = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/admin/index', compact('transaksi'));
    }
}
