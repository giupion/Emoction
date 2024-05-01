<?php

namespace App\Http\Controllers;

use App\Models\Abc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AbcController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validazione dei dati ricevuti dalla richiesta
            $validatedData = $request->validate([
                'data_e_ora' => 'required|date',
                'evento' => 'required|string',
                'Pensiero' => 'nullable|string',
                'Emozione' => 'required|string',
                'Intensita' => 'required|integer',
                'Azione' => 'nullable|string',
            ]);

            // Creazione di una nuova istanza di Abc con i dati validati
            $abc = new Abc();
            $abc->fill($validatedData);
            $abc->user_id = Auth::id(); // Impostazione dell'ID dell'utente autenticato

            // Salvataggio dei dati nel database
            if ($abc->save()) {
                // Se la richiesta è andata a buon fine, reindirizza l'utente alla dashboard
                return redirect()->route('dashboard');
            } else {
                // Se la richiesta non ha avuto successo, restituisci una risposta JSON con un messaggio di errore
                return response()->json(['error' => 'Errore durante il salvataggio dei dati'], 500);
            }
        } catch (\Exception $e) {
            // Gestisci eventuali eccezioni e restituisci una risposta JSON con un messaggio di errore
            Log::error('Errore durante il salvataggio dei dati: ' . $e->getMessage());
            return response()->json(['error' => 'Errore durante il salvataggio dei dati'], 500);
        }
    }
    public function update(Request $request, Abc $abc)
{
    $data = $request->validate([
        'data_e_ora' => 'required|date',
        'evento' => 'required|string',
        'Pensiero' => 'nullable|string',
        'Emozione' => 'nullable|string',
        'Intensita' => 'nullable|integer',
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