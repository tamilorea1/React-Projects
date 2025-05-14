

import React from 'react'

export default function ToDoCard(props) {

    //We are destructuring the list of to dos from the parent component
    //As well as destructuring the itemIndex from ToDoList.
    const {listOfThingsToDo, itemIndex, handleDeleteItem, handleEditItem} = props

    //Use the itemIndex (Position) of a list item to get a specific to do item, and store it in the variable.
    //Ex: If the itemIndex is 0, then we get the first item in the listOfThingsToDo array.
    const thingsToDo = listOfThingsToDo[itemIndex]

  return (
    <div className='Input-container'>
        {/* We now have access to each list item, but specifically we're using their input */}
        <p className='listInput'>{thingsToDo.input}</p>
        
        {/*Here are the buttons, needed to make changes in our component */}
        <div className='inputBtn'>
            <button onClick={() => handleEditItem(itemIndex)} className='doneBtn' disabled= {thingsToDo.complete}>
                <h6>Done</h6>
            </button>
            <button onClick={() => handleDeleteItem(itemIndex)} className='deleteBtn'>
                <h6>Delete</h6>
            </button>
        </div>
    </div>
  )
}
