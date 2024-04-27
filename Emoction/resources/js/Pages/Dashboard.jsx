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

    const { post } = useForm();

    useEffect(() => {
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
    
        try {
            const formData = {
                ...data,
                _token: auth.csrf_token
            };
    
            const response = await Inertia.post('/abc', formData);
    
            if (response && response.ok) {
                setData({
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    Emozione: '',
                    Intensita: '',
                    Azione: ''
                });
                
                // Aggiorniamo la lista dei dati salvati dopo il salvataggio
                setSavedData(prevData => [...prevData, response.data]);
            } else {
                console.error('Errore durante il salvataggio dei dati');
            }
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error.message);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSave} className="w-full mb-8">
                                <div className="mb-4">
                                    <label htmlFor="data_e_ora" className="block text-gray-700">Data e Ora</label>
                                    <input
                                        type="datetime-local"
                                        id="data_e_ora"
                                        name="data_e_ora"
                                        value={data.data_e_ora}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="evento" className="block text-gray-700">Evento</label>
                                    <input
                                        type="text"
                                        id="evento"
                                        name="evento"
                                        value={data.evento}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Pensiero" className="block text-gray-700">Pensiero</label>
                                    <textarea
                                        id="Pensiero"
                                        name="Pensiero"
                                        value={data.Pensiero}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Emozione" className="block text-gray-700">Emozione</label>
                                    <input
                                        type="text"
                                        id="Emozione"
                                        name="Emozione"
                                        value={data.Emozione}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Intensita" className="block text-gray-700">Intensità</label>
                                    <input
                                        type="number"
                                        id="Intensita"
                                        name="Intensita"
                                        value={data.Intensita}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Azione" className="block text-gray-700">Azione</label>
                                    <textarea
                                        id="Azione"
                                        name="Azione"
                                        value={data.Azione}
                                        onChange={handleChange}
                                        className="w-full mt-1"
                                    ></textarea>
                                </div>
                                {/* Inclusione del token CSRF */}
                                <input type="hidden" name="_token" value={auth.csrf_token} />
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salva</button>
                            </form>
                            
                            {/* Display saved data */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Dati salvati:</h3>
                                <table className="min-w-full divide-y divide-gray-200">
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
                                    <tbody>
                                        {savedData.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.data_e_ora}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.evento}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Pensiero}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Emozione}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Intensita}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.Azione}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}