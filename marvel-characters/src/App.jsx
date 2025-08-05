import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [Characters, setCharacters] = useState([]);
    const [id, setId] = useState(0);
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
          <div></div>
          <div className='bg-white grid grid-cols-4 gap-4 p-4'>{Characters.map((list) => (
            <div key={list.id} className='border p-4 rounded shadow'>
              <li>name : {list.name}</li>
              <li>id : {list.id}</li>
              <li>identité : {list.realName}</li>
              <li>universe : {list.universe}</li>
            </div>
          ))}</div>
        </div>
    );
    
}

export default App;