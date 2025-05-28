import {useEffect, useState} from 'react'
import {getFullPokedexNumber, getPokedexNumber} from '../utils'

//Contains all the information about a single Pokemon

export default function PokeCard(props) {

  const{selectedPokemon} = props

  //data is the pokemon information
  //reason why its initially null is to be declare if we have pokemon data/information available.
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if loading, exit loop
    //localStorage is known as our cache database
    if (loading || !localStorage) {
      return
    }
    //check if the selected pokemon information is available in the cache
    //1. Define the cache
    let cache = {}

    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'))
    }

    //2. check if the selected information is in the cache, else fetch from the API
    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon])
      return
    }
   
    async function fetchPokemonData() {
      setLoading(true)
      try {
        const baseUrl = 'https://pokeapi.co/api/v2/'
        const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
        const finalUrl = baseUrl + suffix

        const res = await fetch(finalUrl);

        const pokemonData = await res.json()
        setData(pokemonData)
        console.log(pokemonData)
        cache[selectedPokemon] = pokemonData
        localStorage.setItem('pokedex', JSON.stringify(cache))

      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false)
      }
    }

    fetchPokemonData()

    //3.if we fetch from the API, make sure to save the information to the cache for next time.

  }, [selectedPokemon])
  return (
    <div>
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
      </div>
    </div>
  )
}
