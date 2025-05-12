
import React, { useState } from 'react'

export default function ToDoInput(props) {

  // Destructuring props to get the handleAddListOfThings, newToDo, and setNewToDo functions
  // The handleAddListOfThings function is passed as a prop from the parent component
  // The newToDo state is used to store the value of the input field
  // The setNewToDo function is used to update the newToDo state

  const {handleAddListOfThings, newToDo, setNewToDo} = props;

  

  // The handleAddListOfThings function is called when the add button is clicked
  // It takes the value of the newToDo state as an argument and adds it to the list
  // The setNewToDo function is called to clear the input field after adding the item
  // The input field is controlled by the newToDo state, which is updated using the setNewToDo function
  // The input field is used to enter new items to be added to the list
  // The input field has an onChange event handler that updates the newToDo state with the value entered by the user
  // The input field has a placeholder text to guide the user on what to enter
  // The button has an onClick event handler that calls the handleAddListOfThings function with the newToDo state as an argument
  
  return (
    <header>
        <div className='inputContainer'>
            <input value={newToDo} onChange={(e) => {
              setNewToDo(e.target.value)
            }} className='inputField' type="text" placeholder='Enter things to do' />
            <button className='addBtn' onClick={()=> {
              handleAddListOfThings(newToDo)
              setNewToDo('')
            }}>Add</button>
        </div>
        
    </header>
  )
}

