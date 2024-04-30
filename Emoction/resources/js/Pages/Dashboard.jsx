import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = ({ auth, abcs }) => {
    const [data, setData] = useState({
        data_e_ora: '',
        evento: '',
        Pensiero: '',
        emozioni: [{ nome: '', intensita: '' }],
        Azione: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleEmotionChange = (index, field, value) => {
        const newData = { ...data };
        newData.emozioni[index][field] = value;
        setData(newData);
    };

    const addEmotion = () => {
        setData(prevData => ({
            ...prevData,
            emozioni: [...prevData.emozioni, { nome: '', intensita: '' }]
        }));
    };

    const removeEmotion = (index) => {
        setData(prevData => ({
            ...prevData,
            emozioni: prevData.emozioni.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log('Dati da inviare:', data);
    
        try {
            const response = await Inertia.post(route('abc.store'), data);
            if (response && response.ok) {
                setData({
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    emozioni: [{ nome: '', intensita: '' }],
                    Azione: ''
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
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <div className="py-12 w-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">Aggiungi riga</h3>
                            <form onSubmit={handleSave}>
                                <div className="flex flex-col">
                                    <label htmlFor="data_e_ora">Data e Ora:</label>
                                    <input type="datetime-local" name="data_e_ora" value={data.data_e_ora} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                    <label htmlFor="evento">Evento:</label>
                                    <input type="text" name="evento" value={data.evento} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                    <label htmlFor="Pensiero">Pensiero:</label>
                                    <textarea name="Pensiero" value={data.Pensiero} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                    {data.emozioni.map((emotion, index) => (
                                        <div key={index} className="flex flex-col mt-2">
                                            <label htmlFor={`Emozione${index}`}>Emozione:</label>
                                            <input type="text" name={`Emozione${index}`} value={emotion.nome} onChange={(e) => handleEmotionChange(index, 'nome', e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                            <label htmlFor={`Intensita${index}`}>Intensità:</label>
                                            <input type="number" name={`Intensita${index}`} value={emotion.intensita} onChange={(e) => handleEmotionChange(index, 'intensita', e.target.value)} min="0" className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                            <button type="button" onClick={() => removeEmotion(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">Rimuovi</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addEmotion} className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Aggiungi Emozione</button>
                                    <label htmlFor="Azione">Azione:</label>
                                    <textarea name="Azione" value={data.Azione} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Salva</button>
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
