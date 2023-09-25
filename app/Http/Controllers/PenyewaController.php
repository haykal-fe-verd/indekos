<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PenyewaController extends Controller
{
    public function kamarSaya(Request $request): Response
    {
        $query = Pembayaran::with(['penyewa.user', 'kamar.kategori', 'kamar.foto_kamar', 'kamar.fasilitas_kamar'])
            ->where('penyewa_id', $request->user()->userData()->id)
            ->where('status', '2')
            ->latest();

        $kamarSaya = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/kamar-saya/index', compact('kamarSaya'));
    }

    public function transaksiSaya(Request $request): Response
    {
        $query = Pembayaran::with(['penyewa.user', 'kamar.kategori'])->where('penyewa_id', $request->user()->userData()->id)->latest();

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

        return Inertia::render('auth/transaksi/index', compact('transaksi'));
    }
}
