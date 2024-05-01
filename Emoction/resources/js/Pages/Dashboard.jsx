import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = ({ auth }) => {
    const [formData, setFormData] = useState({
        data_e_ora: '',
        evento: '',
        Pensiero: '',
        Azione: '',
        nome: '', // Nome dell'emozione
        intensita: '', // Intensità dell'emozione
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log('Dati da inviare:', formData); 
        try {
            const response = await Inertia.post(route('abc.store'), formData);

            if (response && response.ok) {
                setFormData({
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    Azione: '',
                    nome: '',
                    intensita: '',
                });
                alert("Dati salvati con successo!");
            } else {
                console.error('Errore durante il salvataggio dei dati');
                alert("Si è verificato un errore durante il salvataggio dei dati.");
            }
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error.message);
            alert("Si è verificato un errore durante il salvataggio dei dati.");
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <div className="py-12 w-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">Aggiungi riga</h3>
                            <form onSubmit={handleSave}>
                                <div className="flex flex-col">
                                    <label htmlFor="data_e_ora">Data e Ora:</label>
                                    <input type="datetime-local" name="data_e_ora" value={formData.data_e_ora} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" required />
                                    <label htmlFor="evento">Evento:</label>
                                    <input type="text" name="evento" value={formData.evento} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" required />
                                    <label htmlFor="Pensiero">Pensiero:</label>
                                    <textarea name="Pensiero" value={formData.Pensiero} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                    <label htmlFor="nome">Emozione:</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" required />
                                    <label htmlFor="intensita">Intensità:</label>
                                    <input type="number" name="intensita" value={formData.intensita} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" required />
                                    <label htmlFor="Azione">Azione:</label>
                                    <input type="text" name="Azione" value={formData.Azione} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" required />
                                    <button type="submit" className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salva</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;

