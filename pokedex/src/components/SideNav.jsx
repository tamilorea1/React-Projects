

import {first151Pokemon, getFullPokedexNumber} from '../utils'
export default function SideNav(props) {
    const {selectedPokemon, setSelectedPokemon} = props

  return (
    <nav>
        <div>
            <h1 className='navHeader'>Pokedex</h1>
            <input className='navInput' type="text" placeholder='Enter Pokemon name' />
        </div>

        {/*In here, the parameter "pokemon" is the pokemon we want displayed */}
        {/*While pokemonIndex is the index number of each pokemon */}
        {first151Pokemon.map((pokemon,pokemonIndex) => {
            return(
                <button key={pokemonIndex} className='pokemonNameBtn'>
                    <p>{getFullPokedexNumber(pokemonIndex)}</p>
                    <p className='pokemonName'>{pokemon}</p>

                </button>
            )
        })}

    </nav>
  )
}
