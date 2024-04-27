<?php
// routes/web.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbcController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Rap2hpoutre\LaravelLogViewer\LogViewerController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/abc', [AbcController::class, 'store'])->name('abc.store');
    Route::get('logs', [LogViewerController::class, 'index']);
});

require __DIR__.'/auth.php';
