<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IndekosController;
use App\Http\Controllers\KamarController;
use App\Http\Controllers\KategoriController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;



//* guest
Route::middleware('guest')->group(function () {
    // home
    Route::get('/', [HomeController::class, 'index'])->name('home'); //*! done

    // daftar kamar
    Route::get('/daftar-kamar', [HomeController::class, 'daftarKamar'])->name('daftar.kamar'); //*! done

    // detail kamar
    Route::get('/detail-kamar/{id}', [HomeController::class, 'detailKamar'])->name('detail.kamar');

    // register
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register'); //*! done
    Route::post('register', [RegisteredUserController::class, 'store']); //*! done

    // login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login'); //*! done
    Route::post('login', [AuthenticatedSessionController::class, 'store']); //*! done

    // forgot-password
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request'); //*! done
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email'); //*! done
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset'); //*! done
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store'); //*! done
});

//* auth
Route::middleware(['auth', 'verified'])->group(function () {
    // change password
    Route::get('change-password', [PasswordController::class, 'index'])->name('password.index'); //*! done
    Route::put('change-password', [PasswordController::class, 'update'])->name('password.update'); //*! done

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); //*! done
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update'); //*! done

    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard'); //*! done

    // admin
    Route::middleware('can:admin')->group(function () {
        Route::get('indekos', [IndekosController::class, 'index'])->name('indekos.index'); //*! done
        Route::post('indekos', [IndekosController::class, 'update'])->name('indekos.update'); //*! done

        Route::get('kategori', [KategoriController::class, 'index'])->name('kategori.index'); //*! done
        Route::post('kategori', [KategoriController::class, 'store'])->name('kategori.store'); //*! done
        Route::put('kategori/{id}', [KategoriController::class, 'update'])->name('kategori.update'); //*! done
        Route::delete('kategori/{id}', [KategoriController::class, 'destroy'])->name('kategori.destroy'); //*! done

        Route::get('kamar', [KamarController::class, 'index'])->name('kamar.index');  //*! done
        Route::get('kamar/create', [KamarController::class, 'create'])->name('kamar.create');  //*! done
        Route::get('kamar/{id}/edit', [KamarController::class, 'edit'])->name('kamar.edit'); //*! done
        Route::get('kamar/{id}/show', [KamarController::class, 'show'])->name('kamar.show'); //*! done
        Route::post('kamar', [KamarController::class, 'store'])->name('kamar.store');  //*! done
        Route::post('kamar/{id}', [KamarController::class, 'update'])->name('kamar.update'); //*! done
        Route::delete('kamar/{id}', [KamarController::class, 'destroy'])->name('kamar.destroy');  //*! done
    });

    // penyewa
    Route::middleware('can:penyewa')->group(function () {
    });
});

// !other route
Route::middleware('auth')->group(function () {
    // logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout'); //*! done

    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice'); //*! done
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify'); //*! done
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send'); //*! done
});
