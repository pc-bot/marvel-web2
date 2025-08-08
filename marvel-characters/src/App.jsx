import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './containers/post.jsx'
import Put from './containers/put.jsx'
import Delete from './containers/delete.jsx'
import Get from './containers/get.jsx'

function App() {
    const [Characters, setCharacters] = useState([]);
    const [openModalPost, setOpenModalPost] = useState(false);
    const [openModalPut,setOpenModalPut] = useState(false)
    const [loading, setLoading] = useState(true);
    const [openModalGet, setOpenModalGet] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const getRequest = async () => {
      const charactersLines = 'http://localhost:3000/characters.json';
       fetch(charactersLines)
      .then((res) => {
        if(!res.ok){
          throw new Error('erreur HTTP')
        }
          return res.json()
      }).then((data)=>{
        setCharacters(data?.characters?.characters || []);
        console.log(data);
        setLoading(false)
        
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })

    }

    const handleAddCharacter = async (character) => {
      const response = await fetch('http://localhost:3000/characters.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });
      const result = await response.json();
      if (response.ok) {
        setCharacters([...Characters, result.character]);
      } else {
        console.error('Error adding character:', result.error);
      }
    };
     
    useEffect(() => {
      getRequest();
    },[])

    return (
        <div className="">
          <div className='items-center justify-center flex'>
          <div className='bg-white text-white font-bold text-xl shadow-md w-300 p-4 flex justify-center items-center'>
            <button onClick={() => setOpenModalGet(true)} className='m-5 rounded-sm w-30 h-10 bg-blue-400 shadow-md'>get</button>
            <button onClick={() => setOpenModalPost(true)} className='m-5 rounded-sm w-30 h-10 bg-green-400 shadow-md'>post</button>
            <button onClick={() => setOpenModalPut(true)} className='m-5 rounded-sm w-30 h-10 bg-yellow-400 shadow-md'>put</button>
            <button onClick={() => setOpenModalDelete(true)} className='m-5 rounded-sm w-30 h-10 bg-red-400 shadow-md' >delete</button>
          </div>
          </div>
          <div className='bg-white mt-5 h-100 grid grid-cols-4 gap-4 p-4'>{Characters.map((list) => (
            <div key={list.id} className=' shadow-lg p-4 rounded-lg bg-gray-100'>
              <p className='text-center'>{list.id}</p>
              <h2 className='text-center text-blue-900 font-bold'>{list.name}</h2>
              <p className='text-center mt-3'>name : {list.name}</p>
              <p className='text-center'>identité : {list.realName}</p>
              <p className='text-center'>universe : {list.universe}</p>
            </div>
          ))}</div>
          {loading && <div className='text-center'>Loading...</div>}
          {openModalPost && <Post closeModalPost={() => setOpenModalPost(false)} addCharacter={handleAddCharacter}/>}
          {openModalPut && <Put closeModalPut={() => setOpenModalPut(false)}  refreshCharacters={getRequest} />}
          {openModalGet && <Get closeModalGet={() => setOpenModalGet(false)} />}
          {openModalDelete && <Delete closeModalDelete={() => setOpenModalDelete(false)}  refreshCharacters={getRequest} />}
        </div>
    );
    
}

export default App;