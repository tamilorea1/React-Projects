import Header from "./components/Header"
import Modal from "./components/Modal"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"
import TypeCard from "./components/TypeCard"

import {useState} from 'react'

function App() {
 
  //This will intially display bulbasaur, since it's the first index
  const [selectedPokemon, setSelectedPokemon] = useState(0)

  return (
    <>
      <Header/>
      <SideNav selectedPokemon = {selectedPokemon} setSelectedPokemon={setSelectedPokemon}/>
      <PokeCard selectedPokemon={selectedPokemon}/>
      
      
    </>
  )
}

export default App
