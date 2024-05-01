<?php
namespace App\Http\Controllers;

use App\Models\Abc;
use App\Models\Emozione;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class AbcController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Log dei dati ricevuti
            Log::info('Dati ricevuti:', $request->all());

            $validatedData = $request->validate([
                'data_e_ora' => 'required|date',
                'evento' => 'required|string',
                'Pensiero' => 'nullable|string',
                'Azione' => 'nullable|string',
                'nome' => 'required|string',
                'intensita' => 'required|integer',
            ]);

            $abc = new Abc();
            $abc->fill($validatedData);
            $abc->user_id = Auth::id();
            $abc->save();

            // Salva il nome e l'intensità associati all'Abc
            Emozione::create([
                'nome' => $validatedData['nome'],
                'intensita' => $validatedData['intensita'],
                'abc_id' => $abc->id,
            ]);

            // Log della conferma di salvataggio
            Log::info('Dati salvati con successo:', $validatedData);

            return Redirect::back()->with('success', 'Riga salvata correttamente.');
        } catch (\Exception $e) {
            Log::error('Errore durante il salvataggio dei dati: ' . $e->getMessage());
            return Redirect::back()->with('error', 'Errore durante il salvataggio dei dati.');
        }
    }
<<<<<<< HEAD

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
=======
>>>>>>> f911cae3f2714635f22b47d5ee3ec2eb47c99552
}
