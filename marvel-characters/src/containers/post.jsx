import React from "react";

export default function Post({closeModalPost, addCharacter}) {
    const [formData, setFormData] = React.useState({
        name: '',
        realName: '',
        universe: ''
    });
    const [error, setError] = React.useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(addCharacter){
            await addCharacter(formData);
            setFormData({
                name: '',
                realName: '',
                universe: ''
            });
        }
    }
    return(
        <div className="flex items-center justify-center fixed inset-0  bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-100 h-110"> 
            <h1 className="text-center text-2xl font-bold text-indigo-900">Add a new Character</h1>
            <form className="m-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <label className="text-blue-900">Name:</label>
                <input value={formData.name} onChange={handleChange} type="text" name="name" className="bg-gray-100 border border-gray-300 p-2 rounded" required />
                <br />
                </div>
                <div className="flex flex-col mt-3">
                <label className="text-blue-900">Real Name:</label>           
                <input value={formData.realName} onChange={handleChange} type="text" name="realName" className="bg-gray-100 border border-gray-300 p-2 rounded" required />
                <br />
                </div>
                <div className="flex flex-col mt-3">
                <label className="text-blue-900">Universe:</label>        
                <input value={formData.universe} onChange={handleChange} type="text" name="universe" className="bg-gray-100 border border-gray-300 p-2 rounded" required />
                <br />
                </div>
                <div className="flex justify-center items-center mt-7">
                    <button type="submit" className="bg-green-500 rounded-md w-20 h-15 text-white">Add Character</button>
                    <button onClick={closeModalPost} className="bg-red-500 rounded-md w-20 h-15 text-white mx-10">Cancel</button>
                </div>
            </form>
            </div>
        </div>
    )
}