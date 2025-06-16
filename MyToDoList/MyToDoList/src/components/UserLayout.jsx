// Importing React (not strictly necessary with modern React but still common)
import React from 'react'

// Importing useState hook from React to manage component state
import { useState } from 'react'

// Declaring the main component that will be exported and rendered
export default function UserLayout() {

    //state for the input field
    const [currentInput, setCurrentInput] = useState('')
    
    //state for the list of tasks
    const [task, setTask] = useState([])

    //state for the filter buttons
    const [currentFilter, setCurrentFilter] = useState('All')

    //handler function for getting the value input in the text field
    function handleInputChange(e) {
        setCurrentInput(e.target.value)
    }

    //handler function for adding new tasks to our list
    function handleAdd() {
        //set an object containing the below key-value pairs
        const newTask = {
            id: Date.now(),
            text: currentInput,
            done: false
        }

        //we set the state and spread its old tasks in the list, alongside the new task(s)
        setTask((prevTask) =>
        [
            ...prevTask,
            newTask
        ]
        )

        //To clear the input field after a task is added
        setCurrentInput('')
    }


    // Handler function to toggle the 'done' status of a task
function handleToggle(taskId) {
    setTask((prevTask) =>
        // Iterate over the previous list of tasks
        //taskItem is currently an object {id: '', text: '', done: false}
        prevTask.map((taskItem) =>
            // For each task, check if its id matches the taskId passed in
            taskItem.id === taskId
                // If it matches, create a new task object with 'done' flipped (true becomes false, false becomes true)
                ? { ...taskItem, done: !taskItem.done }
                // If it doesn't match, return the task unchanged
                : taskItem
        )
    )
}


    function handleDelete(taskId) {
    setTask((prevTask) =>
        // .filter() loops through the entire previous list of tasks (prevTask)
        // and only includes the tasks where the condition is true.
        // In our case, we only include the tasks where the task's ID is NOT equal to the ID we want to delete.

        prevTask.filter((taskItem) =>
            // Example:
            // Let's say prevTask = [
            //   { id: 1, text: "Do laundry", done: false },
            //   { id: 2, text: "Study React", done: true },
            //   { id: 3, text: "Buy groceries", done: false }
            // ]

            // Now suppose we call handleDelete(2)
            // taskItem.id !== 2 will return:
            //   true  for task 1   → keeps it
            //   false for task 2   → removes it
            //   true  for task 3   → keeps it

            // Final result after .filter():
            // [
            //   { id: 1, text: "Do laundry", done: false },
            //   { id: 3, text: "Buy groceries", done: false }
            // ]

            taskItem.id !== taskId
        )
    );
}


    // Handler function to update which filter is currently selected
function handleFilteredTask(filteredTaskName) {
    setCurrentFilter(filteredTaskName)
}


    // Create a filtered version of the task list based on the selected filter
let filteredTasks;

if (currentFilter === 'All') {
    // Show every task, no matter if it's done or not
    filteredTasks = task;
} else if (currentFilter === 'Active') {
    // Show only tasks that are NOT done
    filteredTasks = task.filter((taskItem) => !taskItem.done);
} else if (currentFilter === 'Completed') {
    // Show only tasks that ARE done
    filteredTasks = task.filter((taskItem) => taskItem.done);
}


    // JSX output (what gets rendered on the screen)
    return (
        <>
            {/* Header */}
            <div className='header-container' >
                <h2 className='header'>
                    My To Do App
                </h2>
            </div>

             {/* Task Input Field */}
            <input onChange={handleInputChange} value={currentInput} className='userInput' type="text" placeholder='Enter a new task' />

            {/* Add Task Button */}
            <button onClick={handleAdd} className='addBtn'>Add</button>

            {/* Filter Buttons */}
            <div>
                <button 
                onClick={() => handleFilteredTask('All')}
                className='allBtn'>
                    All
                </button>

                <button
                 onClick={() => handleFilteredTask('Active')}
                className='activeBtn'>
                    Active
                </button>

                <button
                 onClick={() => handleFilteredTask('Completed')}
                className='completedBtn'>
                    Completed
                </button>
            </div>

            {/* Task List */}
            <ul>
                {filteredTasks.map((taskItem) =>
                    <li 
                    className={taskItem.done ? 'done' : ''}
                    key={taskItem.id}
                    onClick={() => handleToggle(taskItem.id)}
                    > 
                    {taskItem.text}
                    <button onClick={() => handleDelete(taskItem.id)}>
                        Delete
                    </button>
                    </li>

                    
                )}
            </ul>
        </>
    )
}
