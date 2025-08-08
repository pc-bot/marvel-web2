import React from "react";

export default function Post({closeModalPost}) {
    const handleSubmit = async (events) => {
        events.preventDefault();
        const formData = {
            name: events.target.name.value,
            realName: events.target.realName.value,
            universe: events.target.universe.value
        }

        try{
            const response = await fetch('http://localhost:3000/characters.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            closeModalPost();
        } catch (error) {
            console.error('Error:', error);
        }

    }
    return(
        <div className="flex items-center justify-center fixed inset-0  bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-100 h-90"> 
            <h1 className="text-center text-2xl font-bold text-indigo-900">Add a new Character</h1>
            <form className="m-5">
                <div className="flex flex-col">
                <label className="text-blue-900">Name:</label>
                <input type="text" name="name" className="bg-gray-100 border border-gray-300" required />
                <br />
                </div>
                <div className="flex flex-col mt-3">
                <label className="text-blue-900">Real Name:</label>           
                <input type="text" name="realName" className="bg-gray-100 border border-gray-300" required />
                <br />
                </div>
                <div className="flex flex-col mt-3">
                <label className="text-blue-900">Universe:</label>        
                <input type="text" name="universe" className="bg-gray-100 border border-gray-300 " required />
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