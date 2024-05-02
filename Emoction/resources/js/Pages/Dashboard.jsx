import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard({ auth, abcs }) {
    const [data, setData] = useState({
        data_e_ora: '',
        evento: '',
        Pensiero: '',
        Emozione: '',
        Intensita: '',
        Azione: ''
    });

    const [savedData, setSavedData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [dateWarning, setDateWarning] = useState(false);
    const [editDateWarning, setEditDateWarning] = useState(false);

    const { post, put, delete: deleteRequest } = useForm();

    useEffect(() => {
        if (abcs) {
            setSavedData(abcs);
        }
    }, [abcs]);

    const handleChange = e => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'data_e_ora') {
            const currentDate = new Date().toISOString().split('T')[0];
            if (value < currentDate) {
                newValue = currentDate;
                setDateWarning(true);
            } else {
                setDateWarning(false);
            }
        }

        if (name === 'Intensita') {
            newValue = Math.max(0, Math.min(100, parseInt(value)));
        }

        setData(prevData => ({ ...prevData, [name]: newValue }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0]; // Ottieni la data odierna corrente

        if (data.data_e_ora.split('T')[0] !== currentDate) {
            setDateWarning(true);
            return;
        }

        try {
            const formData = {
                ...data,
                _token: auth.csrf_token
            };
    
            const response = await Inertia.post('/abc', formData);
    
            if (response && response.ok) {
                setSavedData(prevData => [...prevData, response.data]);
                setData({
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    Emozione: '',
                    Intensita: '',
                    Azione: ''
                });
                setShowForm(false);
            } else {
                console.error('Errore durante il salvataggio dei dati');
            }
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error.message);
        }
    };

    const currentDate = new Date().toISOString().split('T')[0]; // Definisci la data corrente qui

    const handleEditRowChange = (e, fieldName) => {
        const { name, value } = e.target;
        let newValue = value;
    
        if (name === 'data_e_ora') {
            const currentDate = new Date().toISOString().split('T')[0];
            if (value.split('T')[0] !== currentDate) {
                setEditDateWarning(true);
                return;
            } else {
                setEditDateWarning(false);
            }
        }
    
        if (name === 'Intensita') {
            newValue = Math.max(0, Math.min(100, parseInt(value)));
        }
    
        setEditingRow(prevData => ({ ...prevData, [fieldName]: newValue }));
    };
    
    const handleSaveRow = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (editingRow.data_e_ora.split('T')[0] !== currentDate) {
            setEditDateWarning(true);
            return;
        }
    
        try {
            const response = await Inertia.put(`/abc/${editingRow.id}`, {
                ...editingRow,
                _token: auth.csrf_token
            });
    
            if (response && response.ok) {
                setSavedData(prevData =>
                    prevData.map(item =>
                        item.id === editingRow.id ? response.data : item
                    )
                );
                setEditingRow(null);
            } else {
                console.error('Errore durante il salvataggio dei dati');
            }
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error.message);
        }
    };
    
    const handleDeleteRow = async (id) => {
        try {
            const response = await deleteRequest(`/abc/${id}`, {
                _token: auth.csrf_token
            });
    
            if (response && response.ok) {
                setSavedData(prevData =>
                    prevData.filter(item => item.id !== id)
                );
            } else {
                console.error('Errore durante la cancellazione dei dati');
            }
        } catch (error) {
            console.error('Errore durante la cancellazione dei dati:', error.message);
        }
    };

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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {savedData.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.data_e_ora}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.evento}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Pensiero}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Emozione}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Intensita}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Azione}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => setEditingRow(item)} className="text-blue-600 hover:text-blue-900 mr-2">Modifica</button>
                                                    <button onClick={() => handleDeleteRow(item.id)} className="text-red-600 hover:text-red-900">Cancella</button>
                                                </td>
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
                            {editingRow && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Modifica riga:</h3>
                                    <div className="flex flex-col">
                                        <label htmlFor="data_e_ora">Data e Ora:</label>
                                        <input type="datetime-local" name="data_e_ora" value={editingRow.data_e_ora} onChange={(e) => handleEditRowChange(e, 'data_e_ora')} max={`${new Date().getFullYear()}-12-31T23:59`} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        {editDateWarning && (
                                            <div className="text-red-500">Inserisci una data valida!</div>
                                        )}
                                        <label htmlFor="evento">Evento:</label>
                                        <input type="text" name="evento" value={editingRow.evento} onChange={(e) => handleEditRowChange(e, 'evento')} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Pensiero">Pensiero:</label>
                                        <textarea name="Pensiero" value={editingRow.Pensiero} onChange={(e) => handleEditRowChange(e, 'Pensiero')} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Emozione">Emozione:</label>
                                        <input type="text" name="Emozione" value={editingRow.Emozione} onChange={(e) => handleEditRowChange(e, 'Emozione')} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Intensita">Intensità:</label>
                                        <input type="number" name="Intensita" value={editingRow.Intensita} onChange={(e) => handleEditRowChange(e, 'Intensita')} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <label htmlFor="Azione">Azione:</label>
                                        <textarea name="Azione" value={editingRow.Azione} onChange={(e) => handleEditRowChange(e, 'Azione')} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200" />
                                        <button onClick={handleSaveRow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Salva</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
