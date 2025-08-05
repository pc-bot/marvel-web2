import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
    const [Characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true)

    const getRequest = () => {
      const charactersLines = 'http://localhost:3000/characters.json';
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
        <div className="App">
            <header className="App-header">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
                <img src={reactLogo} className="logo react" alt="React logo"/>
                <h1>Marvel Characters</h1>
            </header>
            <main>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {Characters.map((character, index) => (
                            <li key={index}>{character.name}</li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
    
}

export default App;