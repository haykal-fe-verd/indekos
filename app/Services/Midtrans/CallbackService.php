<?php

namespace App\Services\Midtrans;

use App\Models\Pembayaran;
use App\Services\Midtrans\Midtrans;
use Midtrans\Notification;

class CallbackService extends Midtrans
{
    protected $notification;
    protected $pembayaran;
    protected $user;
    protected $serverKey;

    public function __construct()
    {
        parent::__construct();

        $this->serverKey = config('midtrans.server_key');
        $this->_handleNotification();
    }

    public function isSignatureKeyVerified()
    {
        return ($this->_createLocalSignatureKey() == $this->notification->signature_key);
    }

    // handle jika sukses
    public function isSuccess()
    {
        $statusCode = $this->notification->status_code;
        $transactionStatus = $this->notification->transaction_status;
        $fraudStatus = !empty($this->notification->fraud_status) ? ($this->notification->fraud_status == 'accept') : true;

        return ($statusCode == 200 && $fraudStatus && ($transactionStatus == 'capture' || $transactionStatus == 'settlement'));
    }

    // handle jika expired
    public function isExpire()
    {
        return ($this->notification->transaction_status == 'expire');
    }

    // handle jika canceled
    public function isCancelled()
    {
        return ($this->notification->transaction_status == 'cancel');
    }

    // get notif
    public function getNotification()
    {
        return $this->notification;
    }

    public function getPembayaran()
    {
        return $this->pembayaran;
    }

    protected function _createLocalSignatureKey()
    {
        return hash(
            'sha512',
            $this->notification->order_id . $this->notification->status_code .
                $this->notification->gross_amount . $this->serverKey
        );
    }

    protected function _handleNotification()
    {
        $notification = new Notification();

        $orderNumber = $notification->order_id;
        $pembayaran = Pembayaran::where('invoice', $orderNumber)->first();

        $this->notification = $notification;
        $this->pembayaran = $pembayaran;
    }
}
