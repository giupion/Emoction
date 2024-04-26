<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ABC; // Assicurati di importare il model ABC

class ABCController extends Controller
{
    // Metodo per visualizzare tutti i record ABC
    public function index()
    {
        $abcs = ABC::all();
        return response()->json($abcs);
    }

    // Metodo per salvare un nuovo record ABC
    public function store(Request $request)
    {
        // Validazione dei dati in ingresso
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'data_e_ora' => 'required|date',
            'evento' => 'required|string',
            'Pensiero' => 'nullable|string',
            'Emozione' => 'required|string',
            'Intensità' => 'required|integer',
            'Azione' => 'nullable|string',
        ]);

        $abc = new ABC();
        $abc->fill($validatedData);
        $abc->save();

        return response()->json($abc, 201);
    }

    // Metodo per visualizzare un singolo record ABC
    public function show($id)
    {
        $abc = ABC::findOrFail($id);
        return response()->json($abc);
    }

    // Metodo per aggiornare un record ABC esistente
    public function update(Request $request, $id)
    {
        // Trova il record ABC
        $abc = ABC::findOrFail($id);

        // Validazione dei dati in ingresso
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'data_e_ora' => 'sometimes|date',
            'evento' => 'sometimes|string',
            'Pensiero' => 'nullable|string',
            'Emozione' => 'sometimes|string',
            'Intensità' => 'sometimes|integer',
            'Azione' => 'nullable|string',
        ]);

        // Aggiorna i campi del record ABC con i nuovi valori
        $abc->fill($validatedData);
        $abc->save();

        return response()->json($abc, 200);
    }

    // Metodo per eliminare un record ABC
    public function destroy($id)
    {
        $abc = ABC::findOrFail($id);
        $abc->delete();

        return response()->json(null, 204);
    }
}
