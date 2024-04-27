import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';


export default function Dashboard({ auth }) {
    const [data, setData] = useState({
        user_id: auth.user.id,
        data_e_ora: '',
        evento: '',
        Pensiero: '',
        Emozione: '',
        Intensita: '',
        Azione: ''
    });

    const { post } = useForm();

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
    
        try {
            // Aggiunta del token CSRF ai dati
            const formData = {
                ...data,
                _token: auth.csrf_token
            };
    
            // Invio della richiesta di salvataggio dei dati tramite Inertia.post
            const response = await Inertia.post('/abc', formData);
    
            if (response && response.ok) {
                // Se la richiesta è andata a buon fine, reimposta lo stato del form
                setData({
                    user_id: auth.user.id,
                    data_e_ora: '',
                    evento: '',
                    Pensiero: '',
                    Emozione: '',
                    Intensita: '',
                    Azione: ''
                });
                // Aggiungi qui la logica per eventuali feedback all'utente dopo il salvataggio
            } else {
                // Se la richiesta non ha avuto successo, gestisci l'errore
                console.error('Errore durante il salvataggio dei dati');
            }
        } catch (error) {
            // Gestisci eventuali errori di rete o altri errori imprevisti
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
                        <form onSubmit={handleSave} className="w-full">
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

