
//this component will be used to navigate between different pages of the app
import React from 'react'

export default function Tabs(props) {

    //Destructured the list from the parent component
    const {listOfThingsToDo} = props

    //Trying to dynamically assign the number of all tasks
    //We take the lists length and plug it into the 'All' button
    const numOfAllTasks = listOfThingsToDo.length

    //Here, we're trying to dynamically figure out the number of open tasks
    //We take the length of the filtered out the items in the list that are not complete
    const numOfOpenTasks = listOfThingsToDo.filter((item) => !item.complete).length


    //Here, we're trying to dynamically figure out the number of completed tasks
    //We take the length of the filtered out the items in the list that ARE complete
    const numOfCompletedTasks = listOfThingsToDo.filter((item) => item.complete).length
    
    return (
    <nav className='tabs'>
        <button>All <span>({numOfAllTasks})</span></button>
        <button>Open <span>({numOfOpenTasks})</span></button>
        <button>Completed <span>({numOfCompletedTasks})</span></button>
    </nav>
  )
}
