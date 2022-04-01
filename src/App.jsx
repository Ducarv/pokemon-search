import React, { useState } from 'react'
import './App.css'

import api from './service/api';
import pokeball from './assets/pokeball.svg'

export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setTypedPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!typedPokemon) {return}
    setIsLoading(true)  
    
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`)
      setPokemon(response.data)
      setError(false)
      setIsLoading(false)
    } catch (error) {
      setError('Pokemon não encontrado')
      setIsLoading(false)
      setPokemon(null)
    }

    console.log(pokemon)
  }

  return (
    <div className="App">
      <h1>Seja bem-vindo à Pokedex</h1>
      <p>Digite o nome ou id de um Pokemon</p>
      <form onSubmit={handleSubmit}>
        <input  
          value={typedPokemon}
          placeholder='Nome do pokemon/id'
          onChange={handleChange}
        />
        <button type='submit'>
          {isLoading ? (
            <span>Carregando...</span>
          ) : (
            <>
              Buscar <img src={pokeball} alt="pokeball" />
            </>
          )}
        </button>
      </form>
      {error && <span>{error}</span>}
      {pokemon && (
        <div key={pokemon.id} className='pokemon--content'>
            <div className='pokemon--card'>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites['front_default']} alt={pokemon.name} />
            </div>
            <div className='pokemon--infos'>
              <span>
                <strong>Height: </strong>
                {pokemon.height * 10} cm
              </span>
              <span>
                <strong>Weight: </strong>
                {pokemon.weight / 10} kg
              </span>
              <span>
                <strong>Type: </strong>
                {pokemon.types[0].type.name}
              </span>
              <span>
                <strong>Id: </strong>
                {pokemon.id}
              </span>
            </div>
        </div>
      )}
    </div>
  )
}
