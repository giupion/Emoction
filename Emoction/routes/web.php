<?php
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
        $abcs = Abc::where('user_id', auth()->id())->get();
        return Inertia::render('Dashboard', ['abcs' => $abcs]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('abc')->group(function () {
        Route::post('/', [AbcController::class, 'store'])->name('abc.store');
        Route::put('/{abc}', [AbcController::class, 'update'])->name('abc.update');
        Route::delete('/{abc}', [AbcController::class, 'destroy'])->name('abc.destroy');
    });

    Route::get('/logs', [LogViewerController::class, 'index'])->name('log.viewer');
});

require __DIR__.'/auth.php';
