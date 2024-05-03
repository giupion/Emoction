import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard({ auth, abcs }) {
    const [data, setData] = useState({
        data_e_ora: '',
        evento: '',
        Pensiero: '',
        Azione: '',
        Emozione: '',
        Intensita: '',
    });

    const [savedData, setSavedData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);

    useEffect(() => {
        console.log("Abcs:", abcs); // Aggiunto il log per controllare i dati dei record Abc
        if (abcs) {
            setSavedData(abcs);
        }
    }, [abcs]);

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0]; 

        if (data.data_e_ora.split('T')[0] !== currentDate) {
            setDateWarning(true);
            return;
        }

        try {
            const formData = {
                data_e_ora: data.data_e_ora,
                evento: data.evento,
                Pensiero: data.Pensiero,
                Azione: data.Azione,
                Emozione: data.Emozione,
                Intensita: data.Intensita,
            };

            const response = await Inertia.post('/abc', formData);
            if (response && response.ok) {
                setSavedData(prevData => [...prevData, response.data]);
                setData({
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    Azione: '',
                    Emozione: '',
                    Intensita: '',
                });
                setShowForm(false);
            } else {
                console.error('Errore durante il salvataggio dei dati ABC');
            }
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error.message);
        }
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12 w-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">Dati salvati:</h3>
                            <div className="overflow-x-hidden">
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data e Ora</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pensiero</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emozione</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensità</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azione</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {savedData.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.data_e_ora}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.evento}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Pensiero}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.emotions && item.emotions.map(emotion => emotion.nome).join(', ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.emotions && item.emotions.map(emotion => emotion.intensita).join(', ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Azione}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button onClick={() => setShowForm(!showForm)} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                                {showForm ? 'Annulla' : 'Aggiungi riga'}
                            </button>
                            {showForm && (
                                <form onSubmit={handleSave} className="mt-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="data_e_ora">Data e Ora:</label>
                                        <input
                                            type="datetime-local"
                                            name="data_e_ora"
                                            value={data.data_e_ora}
                                            onChange={handleChange}
                                            max={`${currentDate}T23:59`}
                                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                        {dateWarning && (
                                            <div className="text-red-500">Inserisci una data valida!</div>
                                        )}
                                        <label htmlFor="evento">Evento:</label>
                                        <input type="text" name="evento" value={data.evento} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Pensiero">Pensiero:</label>
                                        <textarea name="Pensiero" value={data.Pensiero} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Emozione">Emozione:</label>
                                        <input type="text" name="Emozione" value={data.Emozione} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Intensita">Intensità:</label>
                                        <input type="number" name="Intensita" value={data.Intensita} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Azione">Azione:</label>
                                        <textarea name="Azione" value={data.Azione} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Salva</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
