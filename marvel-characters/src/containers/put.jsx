import React from "react";

export default function Put({closeModalPut}){
    return(
        <div  className="flex items-center justify-center fixed inset-0  bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-120 h-120">
                <h1 className="text-center text-2xl font-bold text-indigo-900">Add an id to update</h1>
            <div className="flex flex-row m-10 align-center justify-center">
                <p className="text-blue-900">id :</p>
                <input type="text" className="bg-gray-100 border border-gray-300 ml-2"/>
            </div>
            <div>
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
                    <button onClick={closeModalPut} className="bg-red-500 rounded-md w-20 h-15 text-white mx-10">Cancel</button>
                </div>
            </form>
            </div>
            
                
            </div>
        </div>
    )
}