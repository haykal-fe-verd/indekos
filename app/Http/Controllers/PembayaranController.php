<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\Midtrans\CreateSnapTokenService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PembayaranController extends Controller
{
    public function index(string $id): Response
    {
        $kamar = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->findOrFail($id);

        return Inertia::render('auth/detail-kamar', compact('kamar'));
    }

    public function store(Request $request): RedirectResponse
    {
        $penyewa = $request->user()->userData();
        $invoice = 'INV-' . Str::slug($request->user()->name) . '-' . now()->format('YmdHis');

        $pembayaran = new Pembayaran();
        $pembayaran->penyewa_id = $penyewa->id;
        $pembayaran->kamar_id = $request->kamar_id;
        $pembayaran->invoice = $invoice;

        $midtrans = new CreateSnapTokenService($pembayaran, $request->user());
        $snapToken = $midtrans->getSnapToken();
        $pembayaran->snap_token = $snapToken;

        $pembayaran->save();

        return redirect()->back()->with('snapToken', $pembayaran->snap_token);
    }

    public function updateVia(Request $request)
    {
        $pembayaran = Pembayaran::where('invoice', $request->invoice)->first();
        $pembayaran->via = $request->via;
        $pembayaran->save();

        return;
    }
}
