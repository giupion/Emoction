<?php

namespace App\Http\Controllers;

use App\Models\Emotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmotionController extends Controller
{
    // Metodo per visualizzare tutte le emozioni
    public function index()
    {
        try {
            // Recupera tutte le emozioni dalla tabella 'emotions'
            $emotions = Emotion::all();
            // Passa i dati alla vista Inertia
            return Inertia::render('Emotions/Index', ['emotions' => $emotions]);
        } catch (\Exception $e) {
            // Gestisci eventuali eccezioni e restituisci una risposta con un messaggio di errore
            Log::error('Errore durante il recupero delle emozioni: ' . $e->getMessage());
            return back()->with('error', 'Errore durante il recupero delle emozioni');
        }
    }

    // Metodo per memorizzare una nuova emozione nel database
    // Metodo per memorizzare una nuova emozione nel database
public function store(Request $request)
{
    // Validazione dei dati ricevuti dalla richiesta
    $validatedData = $request->validate([
        'nome' => 'required|string|max:255', // Imposta la lunghezza massima del campo nome a 255 caratteri
        'intensita' => 'required|integer|between:1,10', // Imposta il campo intensita a un valore compreso tra 1 e 10
    ]);

    try {
        // Creazione di una nuova istanza di Emotion con i dati validati
        $emotion = new Emotion();
        $emotion->fill($validatedData);

        // Salvataggio dei dati nel database
        $emotion->save();

        // Log dei dati inseriti per l'emotzione
        Log::info('Dati salvati per l\'emozione - Nome: ' . $emotion->nome . ', Intensita: ' . $emotion->intensita);

        // Reindirizza l'utente alla pagina di visualizzazione delle emozioni
        return redirect()->route('emotions.index');
    } catch (\Exception $e) {
        // Gestisci eventuali eccezioni e restituisci una risposta con un messaggio di errore
        Log::error('Errore durante il salvataggio dell\'emozione: ' . $e->getMessage());
        return back()->with('error', 'Errore durante il salvataggio dell\'emozione');
    }
}

    

    // Metodo per eliminare un'emozione dal database
    public function destroy(Emotion $emotion)
    {
        try {
            // Eliminazione dell'emozione
            $emotion->delete();

            // Reindirizza l'utente alla pagina di visualizzazione delle emozioni
            return redirect()->route('emotions.index');
        } catch (\Exception $e) {
            // Gestisci eventuali eccezioni e restituisci una risposta con un messaggio di errore
            Log::error('Errore durante l\'eliminazione dell\'emozione: ' . $e->getMessage());
            return back()->with('error', 'Errore durante l\'eliminazione dell\'emozione');
        }
    }
}
