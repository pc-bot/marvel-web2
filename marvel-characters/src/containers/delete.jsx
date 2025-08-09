import React from 'react';

export default function Delete({closeModalDelete, refreshCharacters}) {
    const [id, setId] = React.useState('');
    const [error, setError] = React.useState(null);
    const [character, setCharacter] = React.useState(null);
    const [message, setMessage] = React.useState('');
 

    const handleDelete = async () => {
        if(!id){
            setError('You should enter an id to delete')
            return;
        }
    setMessage('');
    setCharacter(null);
    setError(null);

    try{
        const response = await fetch(`http://localhost:3000/characters.json/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Failed to delete character');
        }

        setMessage('Character deleted successfully');
        setId('');
        if(refreshCharacters) {
            refreshCharacters();
        }
    }catch(error) {
        setError('Failed to delete character');
  

    }
}
    const handleInput = (e) => {
        setId(e.target.value);
        setError(null);
        setMessage('');


    }

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-30">
                <div className="bg-white p-6 rounded-lg shadow-lg w-120 h-70">
                    <h2 className="text-lg font-semibold text-center text-indigo-900">Delete a character</h2>
                    <div className="flex flex-row m-5 align-center justify-center bg-gray-100 border border-gray-300 rounded-md p-3">
                        <h1 className="mx-5">id :</h1>
                        <input type="text" value={id} onChange={handleInput} />
                    </div>
                    {message && <p className="text-center text-green-500">{message}</p>}
                    {error && <p className="text-center text-red-500 ">{error}</p>}
                    <div className='flex justify-center items-center '>
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-5" onClick={handleDelete}>Delete</button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-5" onClick={closeModalDelete}>Close</button>
                    </div>
                    
                </div>
            </div>      
    )

}