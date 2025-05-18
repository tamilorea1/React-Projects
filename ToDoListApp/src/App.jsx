import Header from "./components/Header"
import Tabs from "./components/Tabs"
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"

import {useState, useEffect} from 'react'

function App() {

  //We make a list of things to do using objects
  //We assign things to do with objects names, which will be used in the child components.
  //We also have a checker, using the 'complete' object name
  //Our child component are Header, Tabs, ToDoList, ToDoInput, & ToDoCard.
  //We pass the objects from the parent component using props and destructuring.

  // const listOfThingsToDo = [
  //   {input: 'Walk the dog', complete: false},
  //   {input: 'Go to the gym', complete: true},
  //   {input: 'Do my laundry', complete: true},
  //   {input: 'Buy groceries', complete: false}
  //   ]

  //listOfThingsToDo is the state variable that holds the list of things to do
  //setListOfThingsToDo is the function that updates the state variable
  //useState has an initial value of an empty array. Meaning that when the page loads, the list is empty.
  const [listOfThingsToDo, setListOfThingsToDo] = useState([])

  //selectedTabs is the state variable that holds the selected tab
  //setSelectedTabs is the function that updates the state variable
  //useState has an initial value of 'Open'. Meaning that when the page loads, the open tab is selected.
  //This state is used tpo determine which tab is currently selected.
  const [selectedTabs, setSelectedTabs] = useState('Open')

  //This function handles adding new items to our to do list
  function handleAddItem(newToDo) {
    //we use the spread operator to have the initial list, and then append the new to do item to the end of our list
    //it's initial status should be false, since we're just adding it to the list
    const newToDoList = [...listOfThingsToDo, {input: newToDo, complete: false}]

    //We then update the listOfThingsToDo state with the newToDoList
    //This will cause the component to re-render and display the new item in the list
    setListOfThingsToDo(newToDoList)

    //We use the function handleSavedData to save the newToDoList to local storage
    //This will allow us to persist the data even after the page is refreshed
    handleSavedData(newToDoList)
  }

  //This function handles editing an item in our to do list
  function handleEditItem(index) {
    //Created a duplicate of the listOfThingsToDo array
    let newToDoList = [...listOfThingsToDo]

    //Use the index from our list to get the item we want to edit
    let completedItem = listOfThingsToDo[index]
    
    //Modify the completed status of the item to true
    //This will be used to show that the item is completed
    completedItem['complete'] = true

    //We save the new completed item at the same index in the newToDoList array
    //This will replace the old item with the new completed item
    newToDoList[index] = completedItem

    //We set the newToDoList as the new listOfThingsToDo
    setListOfThingsToDo(newToDoList)
    handleSavedData(newToDoList)

  }

  //This function handles deleting an item from our to do list
  function handleDeleteItem(index){
    //We use the filter method to create a new array without the item at the specified index
    //if the current items index (itemIndex) and the item index (index) are not equal. keep the item in the new list
    //else skip the item and return the new filtered list
    let newToDoList = listOfThingsToDo.filter((item, itemIndex) => {
      return itemIndex !== index
    })

    setListOfThingsToDo(newToDoList)
    handleSavedData(newToDoList)
  }

  
  function handleSavedData(currentList){
    localStorage.setItem('myToDoList', JSON.stringify({
      listOfThingsToDo: currentList
    }))
  }

//When the dependency array is empty, the useEffect will only run once when the component mounts.
//i.e when the page loads
  useEffect(()=> {
    if (!localStorage || !localStorage.getItem('myToDoList')) {
      return
    }
    let db = JSON.parse(localStorage.getItem('myToDoList'));
    setListOfThingsToDo(db.listOfThingsToDo);
  }, [])

  return (
    <>
      {/* In here, we're assigning the list as JSX for props, with it having the same name for the variable for consistency.
      This will make it easy to destructure in the child components below.
      Giving us access to the list. */}
      <Header listOfThingsToDo = {listOfThingsToDo} />
      <Tabs selectedTabs={selectedTabs} setSelectedTabs={setSelectedTabs} listOfThingsToDo = {listOfThingsToDo} />
      <ToDoList handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} selectedTabs={selectedTabs} listOfThingsToDo = {listOfThingsToDo} />
      <ToDoInput handleAddItem = {handleAddItem}/>
    </>
  )
}

export default App

