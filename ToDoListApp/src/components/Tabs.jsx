
//this component will be used to navigate between different pages of the app
import React from 'react'

export default function Tabs(props) {

    //Destructured the list from the parent component
    const {listOfThingsToDo, selectedTabs, setSelectedTabs} = props

    //Trying to dynamically assign the number of all tasks
    //We take the lists length and plug it into the 'All' button
    const numOfAllTasks = listOfThingsToDo.length

    //Here, we're trying to dynamically figure out the number of open tasks
    //We take the length of the filtered out the items in the list that are not complete
    //We use the filter method to check if the item's status is not complete
    const numOfOpenTasks = listOfThingsToDo.filter((item) => !item.complete).length


    //Here, we're trying to dynamically figure out the number of completed tasks
    //We take the length of the filtered out the items in the list that ARE complete
    const numOfCompletedTasks = listOfThingsToDo.filter((item) => item.complete).length
    
    return (
      <>
        <nav className='tabs'>
        {/* The tab buttons are used to navigate between different pages of the app */}
        {/* The selectedTabs state is used to determine which tab is currently selected */}
        {/* The setSelectedTabs function is used to update the selectedTabs state when a tab is clicked */}
        {/* The className is used to apply styles to the selected tab */}

        <button onClick={() => setSelectedTabs('All')} className={`tab-button ${selectedTabs === 'All' ? 'tab-selected' : ''}`}>All <span>({numOfAllTasks})</span></button>
        <button onClick={() => setSelectedTabs('Open')} className={`tab-button ${selectedTabs === 'Open' ? 'tab-selected' : ''}`}>Open <span>({numOfOpenTasks})</span></button>
        <button onClick={() => setSelectedTabs('Completed')} className={`tab-button ${selectedTabs === 'Completed' ? 'tab-selected' : ''}`}>Completed <span>({numOfCompletedTasks})</span></button>
   
        </nav>
        <hr />
      </>
    
    
  )
}
