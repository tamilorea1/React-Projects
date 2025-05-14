import Header from "./components/Header"
import Tabs from "./components/Tabs"
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"

function App() {

  //We make a list of things to do using objects
  //We assign things to do with objects names, which will be used in the child components.
  //We also have a checker, using the 'complete' object name
  //Our child component are Header, Tabs, ToDoList, ToDoInput, & ToDoCard.
  //We pass the objects from the parent component using props and destructuring.

  const listOfThingsToDo = [
    {input: 'Walk the dog', complete: false},
    {input: 'Go to the gym', complete: true},
    {input: 'Do my laundry', complete: true},
    {input: 'Buy groceries', complete: false}
  ]
  return (
    <>
      {/* In here, we're assigning the list as JSX for props, with it having the same name for the variable for consistency.
      This will make it easy to destructure in the child components below.
      Giving us access to the list. */}
      <Header listOfThingsToDo = {listOfThingsToDo} />
      <Tabs listOfThingsToDo = {listOfThingsToDo} />
      <ToDoList listOfThingsToDo = {listOfThingsToDo} />
      <ToDoInput/>
    </>
  )
}

export default App

