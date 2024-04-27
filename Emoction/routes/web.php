<?php
// routes/web.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbcController;
use App\Http\Controllers\ProfileController;
use App\Models\Abc;
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
        // Recupera tutti i dati dalla tabella 'abcs'
        $abcs = Abc::all();
        // Passa i dati alla vista Inertia
        return Inertia::render('Dashboard', ['abcs' => $abcs]);
    })->name('dashboard');
    

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/abc', [AbcController::class, 'store'])->name('abc.store');
    Route::get('logs', [LogViewerController::class, 'index']);
    Route::post('/abc', [AbcController::class, 'store']);
    Route::put('/abc/{abc}', [AbcController::class, 'update']);
    Route::delete('/abc/{abc}', [AbcController::class, 'destroy']);});

require __DIR__.'/auth.php';
