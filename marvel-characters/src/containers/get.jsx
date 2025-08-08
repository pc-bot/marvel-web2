import React from 'react';

export default function Get({closeModalGet}) {
    const [id, setId] = React.useState('');
    const [error, setError] = React.useState('');
    const [character, setCharacter] = React.useState(null);

    const fetchCharacter = async () =>{
        if(!id){
            setError('Please enter a character ID');
            setCharacter(null); 
            return;
        }
        setError('');
    try {
        const response = await fetch(`http://localhost:3000/characters.json/${id}`);
        if(!response.ok){
            throw new Error('Character not found')
        }
        const data = await response.json();
        setCharacter(data.character)
    } catch (error) {
        setError(error.message);
        setCharacter(null)
        
    }
    }
    const handleInput = (e) => {
        setId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCharacter();
    }



    return (
 <div className="flex items-center justify-center fixed inset-0 bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120 h-100">
        <h2 className="text-lg font-semibold text-center text-indigo-900">Select a character</h2>
        <form onSubmit={handleSubmit} className="flex flex-row m-5 align-center justify-center bg-gray-100 border border-gray-300 rounded-md p-3">
          <h1 className="mx-5">id</h1>
          <input
            type="text"
            value={id}
            onChange={handleInput}
            className="border border-gray-300 rounded-md p-1"
          />
          <button
            type="submit"
            className="ml-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        {error && <p className="text-center text-red-500">{error}</p>}
        {character && (
          <div className="mt-4 p-2 bg-gray-50 border border-gray-200 rounded-md">
            <p><strong>ID:</strong> {character.id}</p>
            <p><strong>Name:</strong> {character.name}</p>
            <p><strong>Real Name:</strong> {character.realName}</p>
            <p><strong>Universe:</strong> {character.universe}</p>
          </div>
        )}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
          onClick={closeModalGet}
        >
          Close
        </button>
      </div>
    </div>
    );
}