<?php

namespace App\Http\Controllers;

use App\Models\Abc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class AbcController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'data_e_ora' => 'required|date',
                'evento' => 'required|string',
                'Pensiero' => 'nullable|string',
                'emozioni' => 'required|array',
                'emozioni.*.nome' => 'required|string',
                'emozioni.*.intensita' => 'required|integer',
                'Azione' => 'nullable|string',
            ]);

            $abc = new Abc();
            $abc->fill($validatedData);
            $abc->user_id = Auth::id();
            $abc->save();

            return Redirect::back()->with('success', 'Riga salvata correttamente.');
        } catch (\Exception $e) {
            Log::error('Errore durante il salvataggio dei dati: ' . $e->getMessage());
            return Redirect::back()->with('error', 'Errore durante il salvataggio dei dati.');
        }
    }

    public function update(Request $request, Abc $abc)
    {
        try {
            $validatedData = $request->validate([
                'data_e_ora' => 'required|date',
                'evento' => 'required|string',
                'Pensiero' => 'nullable|string',
                'emozioni.*.nome' => 'required|string',
                'emozioni.*.intensita' => 'required|integer',
                'Azione' => 'nullable|string',
            ]);

            $abc->update($validatedData);

            return Redirect::route('dashboard')->with('success', 'Riga aggiornata correttamente.');
        } catch (\Exception $e) {
            Log::error('Errore durante l\'aggiornamento dei dati: ' . $e->getMessage());
            return Redirect::route('dashboard')->with('error', 'Errore durante l\'aggiornamento dei dati.');
        }
    }

    public function destroy(Abc $abc)
    {
        try {
            $abc->delete();

            return Redirect::route('dashboard')->with('success', 'Riga eliminata correttamente.');
        } catch (\Exception $e) {
            Log::error('Errore durante la cancellazione dei dati: ' . $e->getMessage());
            return Redirect::route('dashboard')->with('error', 'Errore durante la cancellazione dei dati.');
        }
    }
}
