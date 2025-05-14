
//This component contains the list of to-do items
import React from 'react'
import ToDoCard from './ToDoCard'

export default function ToDoList(props) {

    //we destructure the list from our parent component
    const {listOfThingsToDo, selectedTabs} = props

    //We create a variable called tab, which will be used to filter the list of things to do.
    //We set the tab to 'All' for now, but this will be changed later to filter the list based on the tab selected.
    // const tab = 'All'

    //We create a variable called filteredToDoList, which will be used to filter the list of things to do based on the tab selected.
    //We use the filter method to filter the list based on the tab selected.
    const filteredToDoList = 
      selectedTabs === 'All' ? listOfThingsToDo :
      selectedTabs === 'Completed' ? listOfThingsToDo.filter((item) => item.complete) :
      listOfThingsToDo.filter((item) => !item.complete)

  return (
    <>
        {/* Loop through each list item, with their list name stored in "item" and we store their index in "itemIndex".
        For each list item, create a ToDoCard component to show that item on the screen.
        We then pass the item and itemIndex props to the ToDoCard component. */}
        {filteredToDoList.map((item, itemIndex) => {
            return(
                <ToDoCard 
                key={itemIndex} 
                itemIndex = {itemIndex}  
                {...props}/>
            )
        })}
    </>
  )
}
