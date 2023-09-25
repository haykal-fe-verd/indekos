<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Midtrans\CallbackService;
use Carbon\Carbon;

class PaymentCallbackController extends Controller
{
    public function receive()
    {
        $callback = new CallbackService;


        if ($callback->isSignatureKeyVerified()) {
            $notification = $callback->getNotification();
            $pembayaran = $callback->getPembayaran();


            if ($callback->isSuccess()) {
                Pembayaran::with(['kamar'])->where('id', $pembayaran->id)->update([
                    'status' => 2,
                ]);
            }

            if ($callback->isExpire()) {
                Pembayaran::where('id', $pembayaran->id)->update([
                    'status' => 3,
                ]);
            }

            if ($callback->isCancelled()) {
                Pembayaran::where('id', $pembayaran->id)->update([
                    'status' => 4,
                ]);
            }

            return response()
                ->json([
                    'success' => true,
                    'message' => 'Notifikasi berhasil diproses',
                ]);
        } else {
            return response()
                ->json([
                    'error' => true,
                    'message' => 'Signature key tidak terverifikasi',
                ], 403);
        }
    }
}
