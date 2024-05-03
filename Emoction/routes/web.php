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
        $abcs = Abc::with('emotions')->get();
        return Inertia::render('Dashboard', ['abcs' => $abcs]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/abc', [AbcController::class, 'store'])->name('abc.store');
    Route::put('/abc/{abc}', [AbcController::class, 'update'])->name('abc.update');
    Route::delete('/abc/{abc}', [AbcController::class, 'destroy'])->name('abc.destroy');

    // Rotte aggiuntive per la gestione dei log
    Route::get('logs', [LogViewerController::class, 'index'])->middleware('can:viewLogs')->name('logs.index');
});

require __DIR__.'/auth.php';
