import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './containers/post.jsx'

function App() {
    const [Characters, setCharacters] = useState([]);
    const [openModalPost, setOpenModalPost] = useState(false);
    const [loading, setLoading] = useState(true);

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
     
    useEffect(() => {
      getRequest();
    },[])

    return (
        <div className="App">
          <div className='bg-gray-800 text-white p-4 flex justify-between items-center'>
            <button onClick={() => setOpenModalPost(true)}>post</button>

          </div>
          <div className='bg-white mt-30 h-100 grid grid-cols-4 gap-4 p-4'>{Characters.map((list) => (
            <div key={list.id} className=' shadow-lg p-4 rounded-lg bg-gray-100'>
              <p className='text-center'>{list.id}</p>
              <h2 className='text-center text-blue-900 font-bold'>{list.name}</h2>
              <p className='text-center mt-3'>name : {list.name}</p>
              <p className='text-center'>identité : {list.realName}</p>
              <p className='text-center'>universe : {list.universe}</p>
            </div>
          ))}</div>
          {loading && <div className='text-center'>Loading...</div>}
          {openModalPost && <Post closeModalPost={() => setOpenModalPost(false)} />}
        </div>
    );
    
}

export default App;