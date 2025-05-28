
import React, { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName}) {
    //Used to check if we're currently editing the name of the user
    //the initial value is set to false, since we're not intially going to be editing unless the button is clicked
    const [isEditing, setIsEditing] = useState(false)

    //state of our input field for the player name(s)
    //we set its default value to 'Player 1'
    const [player, setPlayer] = useState(initialName)

    //This runs when the 'edit' button is clicked
    function handleEdit() {
        //updating my state with the previous state value (good practice)
        //similar to writing setIsEditing(!isEditing)
        setIsEditing((editing) => !editing); //isEditing changes to true
        
        if (isEditing) {
            onChangeName(symbol, player)
        }
        
    }

    //this function handles the input field where we want to change the player name
    function handleNameChange(event){
        // event.target.value is the value of the input field
        setPlayer(event.target.value)
    }

    //If isEditing is true, display an input field to change the player name
    //If isEditing is false, display the player name as a span.
    //Set the conditional to a variable called playerName

    //We set the value attribute of the input field to the player state
    //This way, the input field will always display the current player name
    //We set the onChange attribute to the handleNameChange function
    //This way, when the input field changes, the player state will be updated
    let playerName = isEditing ? <input type="text" value={player} onChange={handleNameChange} /> : 
                                 <span className="player-name">{player}</span>
                                
    //if isEditing is true, the button should change to 'Save'
    //if isEditing is false, the button should change to 'Edit'
    //Set the conditional to a variable called buttonCaption    
    let buttonCaption = isEditing ? 'Save' : 'Edit'

  return (
    <li className={isActive ? 'active' : undefined}>
        {/* Display the player name and symbol */}
        
        <span className="player">
            {/* display the variable that contains the ternary conditional */}
            {playerName}
            
            <span className="player-symbol">{symbol}</span>
        </span>

        {/* Display the button to edit the player name */}
        {/* onClick will run the handleEdit function */}
        {/* display the variable that contains the ternary conditional */}
        <button onClick={handleEdit}>{buttonCaption}</button>
            </li>
  )
}
