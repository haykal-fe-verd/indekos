<?php

namespace App\Services\Midtrans;

use Midtrans\Snap;

class CreateSnapTokenService extends Midtrans
{
    protected $pembayaran, $user;

    public function __construct($pembayaran, $user)
    {
        parent::__construct();

        $this->pembayaran = $pembayaran;
        $this->user = $user;
    }

    public function getSnapToken()
    {
        // dd($this->user, $this->pembayaran);
        $params = [
            'transaction_details' => [
                'order_id' => $this->pembayaran->invoice,
                'gross_amount' => $this->pembayaran->kamar->harga_kamar,
            ],
            'item_details' => [
                [
                    'id' => $this->pembayaran->id,
                    'price' => $this->pembayaran->kamar->harga_kamar,
                    'quantity' => 1,
                    'name' => $this->pembayaran->kamar->nama_kamar,
                ],
            ],
            'customer_details' => [
                'first_name' => $this->user->name,
                'email' => $this->user->email,
                'phone' => $this->user->userData()->no_hp,
            ]
        ];

        $snapToken = Snap::getSnapToken($params);
        return $snapToken;
    }
}
