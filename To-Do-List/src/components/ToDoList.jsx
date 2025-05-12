
import React from 'react'
import ToDoCard from './ToDoCard'

export default function ToDoList(props) {
    // Destructuring props to get the listOfThings array
    // The listOfThings array is passed as a prop from the parent component
    // The listOfThings array contains the items to be displayed in the to-do list
    // The map method is used to iterate over the listOfThings array and create a new array of ToDoCard components
    // Each ToDoCard component is passed the necessary props, including the index of the item in the list
    // The index is used as a key for each ToDoCard component to help React identify which items have changed, are added, or are removed
    const {listOfThings} = props



  return (
    <ul className='main'>
        {listOfThings.map((element, elementIndex) =>
        {
            return(
                <ToDoCard {...props} key={elementIndex} index ={elementIndex}>
                    <p>{element}</p>
                </ToDoCard>
            )
        })}
    </ul>
  )
}
