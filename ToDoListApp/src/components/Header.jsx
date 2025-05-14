
//This is a simple header component for a ToDo List application.
import React from 'react'

export default function Header(props) {

    //Here is how we call the to do list from the parent component to the child component using props & destructuring.
    //Now we can use it in our component with access to everything in the list.
    const {listOfThingsToDo} = props

    //Here we're trying to dynamically show the number of things to do
    //We access the length of our list and assign it to a variable.
    //This variable is then called using JSX in our H1 tag.
    const listLength = listOfThingsToDo.length

    //If the length of the list is not equal to 1, then the task(s) is multiple
    const isListPlural = listLength != 1;

    //This uses the ternary operator
    //Its condition is, if the length of the list is not equal to 1
    // If that's the case, it should show tasks
    //Otherwise, task.
    //We then call the variable using JSX in H1
    const taskOrTasks = isListPlural ? 'tasks' : 'task';

  return (
    <header>
        <h1 className='headerText'>You have {listLength} open {taskOrTasks}</h1>
    </header>
  )
}
