import React, { useState, useEffect } from 'react';

export default function Put({ closeModalPut }) {
  const [characterId, setCharacterId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    realName: '',
    universe: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Charger les données initiales du personnage si un ID est fourni
  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/characters.json/${characterId}`);
        if (!response.ok) {
          throw new Error('Character not found');
        }
        const data = await response.json();
        setFormData(data.character); // Pré-remplir avec les données existantes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [characterId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') {
      setCharacterId(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!characterId) {
      setError('Please enter a character ID');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:3000/characters.json/${characterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', realName: '', universe: '' }); // Réinitialiser après succès
        setCharacterId(''); // Réinitialiser l'ID
      } else {
        setError(result.error || 'Update failed');
      }
    } catch (err) {
      setError('Error updating character');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120 h-120">
        <h1 className="text-center text-2xl font-bold text-indigo-900">Add an id to update</h1>
        <div className="flex flex-row m-10 align-center justify-center">
          <p className="text-blue-900">id :</p>
          <input
            type="text"
            value={characterId}
            onChange={handleInputChange}
            name="id"
            className="bg-gray-100 border border-gray-300 ml-2"
            placeholder="Enter ID"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} className="m-5">
            <div className="flex flex-col">
              <label className="text-blue-900">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300"
                required
              />
              <br />
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-blue-900">Real Name:</label>
              <input
                type="text"
                name="realName"
                value={formData.realName}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300"
                required
              />
              <br />
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-blue-900">Universe:</label>
              <input
                type="text"
                name="universe"
                value={formData.universe}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300"
                required
              />
              <br />
            </div>
            <div className="flex justify-center items-center mt-7">
              <button
                type="submit"
                className="bg-green-500 rounded-md w-20 h-15 text-white"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Character'}
              </button>
              <button
                onClick={closeModalPut}
                className="bg-red-500 rounded-md w-20 h-15 text-white mx-10"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-center text-red-500 mt-2">{error}</p>}
            {success && <p className="text-center text-green-500 mt-2">Character updated successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}