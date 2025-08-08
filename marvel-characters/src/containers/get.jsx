import React from 'react';

export default function Get({closeModalGet}) {

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-30">
            <div className='bg-white p-6 rounded-lg shadow-lg w-120 h-50'>
            <h2 className='text-lg font-semibold text-center text-indigo-900'>Select a character</h2>
            <div className='flex flex-row m-5 align-center justify-center bg-gray-100 border border-gray-300 rounded-md p-3'>
               <h1 className='mx-5'>id :</h1>
               <input type="text" />
            </div>
            <button className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600' onClick={closeModalGet}>Close</button>
            </div>
        </div>
    );
}