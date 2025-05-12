
import React from 'react'

export default function ToDoCard(props) {
    // Destructuring props to get the children, handleDelete, index, and handleEdit functions
    const {children, handleDelete, index, handleEdit} = props;

    // The children prop is used to display the content of the ToDoCard component
    // The handleDelete and handleEdit functions are passed as props from the parent component
    // The index prop is used to identify the specific item in the list that needs to be edited or deleted
    // The handleDelete function is called when the delete button is clicked
    // The handleEdit function is called when the edit button is clicked
  return (
    <li className='toDoItem'>
        {children}
        <div className='actionContainer'>
            <button onClick={() => {
                handleEdit(index)
            }}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={() => {
                handleDelete(index)
            }}>
                <i className="fa-solid fa-trash"></i>
            </button>
           
           
        </div>
                    
    </li>
  )
}
