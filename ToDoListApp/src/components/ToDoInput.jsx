import {React, useState} from 'react'

// This component lets the user type in a new task and add it to the to-do list
export default function ToDoInput(props) {

  //We get handleAddItem from the parent component (App.jsx)
  const {handleAddItem} = props

  //InputValue holds the text the user types in the input field
  //setInputValue updates the text
  const [inputValue, setInputValue] = useState('')
  // console.log(inputValue) debugging purpose

  return (
    <div className='inputContainer'>

      {/* This input field lets the user type in a to-do item */}
      {/* It updates the inputValue state whenever the user types */}
      {/* The e in the onChange stands for event, which is the thing that happens when a user types */} 
      {/* e.target represents the input box */}
      {/* e.target.value is what the user typed in */} 
        <input className='inputField' type="text" value={inputValue} 
        onChange={(e) => {setInputValue(e.target.value)}} 
        placeholder='Enter things to do'  />
        
        {/* When the add button is clicked: 
            - If the input is empty, do nothing
            - Otherwise, send the input to the parent using handleAddItem
            - Then clear the input field */}
        <button className='addBtn' onClick={() =>  
          {
            if (!inputValue) {
              return
            }
            handleAddItem(inputValue)
            setInputValue('')}} >
              
        <i className="fa-solid fa-plus"></i>
        </button>
      
    </div>
  )
}
