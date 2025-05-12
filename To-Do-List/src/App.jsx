import { useState, useEffect } from "react" 
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"


function App() {

const [listOfThings, setListOfThings] = useState([]); // State to store the list of things
 
const [newToDo, setNewToDo] = useState(''); // State to store the new to-do item

// Function to persist data in local storage
// This function takes a new list as an argument and stores it in local storage
function persistData(newList){
  localStorage.setItem('listOfThings', JSON.stringify({
    listOfThings: newList}))
}

// Function to handle adding a new item to the list
// This function takes a new list item as an argument, adds it to the existing list, and updates the state
// It also calls the persistData function to store the updated list in local storage
// The function uses the spread operator to create a new array with the existing items and the new item
function handleAddListOfThings(newListItem){
    const newItem = [...listOfThings, newListItem]
    persistData(newItem)
    setListOfThings(newItem);
}

// Function to handle deleting an item from the list
// This function takes an index as an argument, filters the existing list to remove the item at that index, and updates the state
// It also calls the persistData function to store the updated list in local storage

function handleDelete(index){
  const newItem = listOfThings.filter((element, elementIndex) => {
      return elementIndex != index
  })
  persistData(newItem)
  setListOfThings(newItem);
}

// Function to handle editing an item in the list
// This function takes an index as an argument, retrieves the item at that index, sets it as the newToDo state, and deletes the item from the list
// It also calls the persistData function to store the updated list in local storage
// The function uses the filter method to create a new array without the item at the specified index
// The function also updates the state with the new list
function handleEdit(index){
  const valueToBeEdited = listOfThings[index];
  setNewToDo(valueToBeEdited);
  handleDelete(index);
}

/*Initial form of useEffect. useEffect(() => {}, [])  */
// useEffect is a hook that allows you to perform side effects in function components
// The first argument is a function that runs after the component renders
// The second argument is an array of dependencies that determines when the effect runs
useEffect(() => {
  if (!localStorage) {
    return 
  }
  let localItems = localStorage.getItem('listOfThings')

  if (!localItems) {
    return
  }

  localItems = JSON.parse(localItems).listOfThings
  setListOfThings(localItems);

}, [])


// The App component is the main component of the application
// It renders the ToDoInput and ToDoList components
// It passes the necessary props to the child components
// The ToDoInput component is responsible for adding new items to the list
// The ToDoList component is responsible for displaying the list of items
// The handleAddListOfThings, handleDelete, and handleEdit functions are passed as props to the child components
// The newToDo and setNewToDo states are also passed as props to the ToDoInput component
  return (
    <>

      <ToDoInput newToDo= {newToDo} setNewToDo= {setNewToDo} handleAddListOfThings = {handleAddListOfThings} />
      <ToDoList handleEdit = {handleEdit} handleDelete= {handleDelete} listOfThings = {listOfThings}/>
    </>
  )
}

export default App
