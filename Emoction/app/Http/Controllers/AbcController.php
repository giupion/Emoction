<?php

namespace App\Http\Controllers;

use App\Models\Abc;
use App\Models\Emotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class AbcController extends Controller
{
    public function index()
{
    $abcs = Abc::with('emotions')->get();
   
    return Inertia::render('Dashboard', ['abcs' => $abcs]);
}


    



public function store(Request $request)
{
    try {
        // Validazione dei dati ricevuti dalla richiesta
        $validatedData = $request->validate([
            'data_e_ora' => 'required|date',
            'evento' => 'required|string',
            'Pensiero' => 'nullable|string',
            'Azione' => 'nullable|string',
            'Emozione' => 'required|string',
            'Intensita' => 'required|integer|between:1,10',
        ]);

        // Creazione di una nuova istanza di Abc con i dati validati
        $abc = new Abc();
        $abc->fill($validatedData);
        $abc->user_id = Auth::id();

        // Salva l'istanza di Abc nel database
        $abc->save();

        // Creazione di una nuova istanza di Emotion
        $emotion = new Emotion();
        $emotion->nome = $validatedData['Emozione'];
        $emotion->intensita = $validatedData['Intensita'];

        // Salva l'istanza di Emotion nel database
        $emotion->save();

        // Associa l'emozione all'istanza di Abc
        $abc->emotions()->attach($emotion, ['intensity' => $emotion->intensita]);

        // Reindirizza l'utente alla dashboard dopo il salvataggio dei dati
        return Inertia::location(route('dashboard'));
    } catch (\Exception $e) {
        // Gestione dell'errore
        Log::error('Errore durante il salvataggio dei dati: ' . $e->getMessage());
        return back()->with('error', 'Errore durante il salvataggio dei dati');
    }
}





    public function update(Request $request, Abc $abc)
    {
        $data = $request->validate([
            'data_e_ora' => 'required|date',
            'evento' => 'required|string',
            'Pensiero' => 'nullable|string',
            'Azione' => 'nullable|string',
        ]);

        $abc->update($data);

        // Restituisci una risposta Inertia con i dati aggiornati
        return Inertia::location(route('dashboard'));
    }

    public function destroy(Abc $abc)
    {
        $abc->delete();

        return Inertia::location(route('dashboard'));
    }
}
