import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
    const [Characters, setCharacters] = useState([]);
    const [getcharacterslist, setgetCharacters] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const getRequest = () => {
      const charactersLines = '/characters.json'
      fetch(charactersLines)
      .then((res) => {
        if(!res.ok){
          throw new Error('erreur HTTP')
        }
          return res.json()
      }).then((data)=>{
        setCharacters(data?.characters || []);
        console.log(data);
        
        setLoading(false)
        
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })

    }
     
    useEffect(() => {
      getRequest();
    },[])

    return (
      <div>
        <div className='justify-center flex bg-blue-100 w-200 mx-60 rounded-bl-lg rounded-br-lg'>
          <button className='bg-yellow-500 shadow-xl w-30 h-10 m-10'>GET</button>
          <button className='bg-green-500 shadow-xl w-30 m-10'>POST</button>
          <button className='bg-blue-500 shadow-xl w-30 m-10'>PUT</button>
          <button className='bg-red-500 shadow-xl w-30 m-10'>DELETE</button>
        </div>
                  <div className='m-5'>
        <div className='justify-center flex'>
        <div className='bg-gray-300 flex flex-row h-10'>
          <p className='m-3'>id : </p>
          <input type="text" className='bg-white h-6 m-2 '/>
          
        </div>
        </div>
        <div className='grid grid-cols-4 grid-rows-2 gap-4'>
          {loading ? <p>...</p> : Characters.map((char, index) => (
      <div key={index} className='w-60 h-30 m-5 rounded-sm bg-gray-100 shadow-xl'>
        <p className='text-center m-2'>{char.id}</p>
        <h1 className='text-center mt-2'>name : {char.name}</h1>
        <p className='text-center'>identity : {char.realName}</p>
        <p className='text-center'>universe : {char.universe}</p>
      </div>
    ))}
        </div>
        <button>close</button>
        </div>
      </div>
    )
}

export default App;